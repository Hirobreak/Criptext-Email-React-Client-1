const Imap = require('imap');
const inspect = require('util').inspect;
const { parseSimpleEmail } = require('./mailParser');
const {
  createEmail,
  getLabelsByText,
  createLabel
} = require('../database/DBEmanager');
const { saveEmailBody } = require('../utils/FileUtils');

let imap;
const BATCH = 20;

const getUrlByClient = client => {
  switch (client) {
    case 'outlook':
      return 'outlook.office365.com';
    default:
      return 'imap.gmail.com';
  }
};

const initConnection = async (
  { email, password, client, accountId, accountEmail, databaseKey },
  progressCallback
) => {
  const clientUrl = getUrlByClient(client);
  const server = await initializeImap({
    user: email, //andres.menoscal1993@gmail.com
    password: password, //$1$2$3$4
    host: clientUrl,
    port: 993,
    tls: true,
    tlsOptions: {
      servername: clientUrl
    }
  });
  const labelsMap = await getMailLabels(server, accountId);
  console.log(labelsMap);
  for (const mailbox in labelsMap) {
    await getMailboxEmails(
      {
        mailbox,
        server,
        labelsMap,
        accountId,
        accountEmail,
        databaseKey
      },
      progressCallback
    );
  }
};

const initializeImap = params => {
  return new Promise((resolve, reject) => {
    imap = new Imap(params);
    imap.once('error', err => {
      console.log('Error Connect :', err);
      reject(err);
    });

    imap.once('ready', () => {
      resolve(imap);
    });
    imap.connect();
  });
};

const getMailboxEmails = (
  {
    mailbox = 'INBOX',
    server,
    labelsMap,
    accountEmail,
    accountId,
    databaseKey
  },
  progressCallback
) => {
  return new Promise((resolve, reject) => {
    const externalIndex = Date.now();
    server.openBox(mailbox, (error, box) => {
      console.log(mailbox, box);

      if (box.messages.total <= 0) {
        resolve();
        return;
      }

      if (error) {
        console.log('error 1: ', error);
        reject(error);
        return;
      }

      server.search(['ALL'], async (error, uids) => {
        if (error) {
          console.log('error 2: ', error);
          reject(error);
        }

        let parsedEmails = 0;

        progressCallback({
          parsedEmails,
          totalEmails: uids.length,
          lastEmail: mailbox,
          type: 'import'
        });

        let fetchUids = uids.splice(0, BATCH);
        while (fetchUids.length > 0) {
          await fetchAndParseEmails(
            {
              server,
              totalEmails: uids.length,
              initialCount: parsedEmails,
              accountEmail,
              accountId,
              databaseKey,
              externalIndex,
              labelsMap,
              fetchUids,
              mailbox
            },
            progressCallback
          );
          parsedEmails += BATCH;
          fetchUids = uids.splice(0, BATCH);
        }

        resolve();
      });
    });
  });
};

const fetchAndParseEmails = (
  {
    server,
    initialCount,
    totalEmails,
    accountEmail,
    accountId,
    databaseKey,
    externalIndex,
    labelsMap,
    fetchUids,
    mailbox
  },
  progressCallback
) => {
  return new Promise(resolve => {
    let parsedEmails = initialCount;
    const emailsToCreate = {};
    const fetch = server.fetch(fetchUids, {
      bodies: [''], //['HEADER.FIELDS (FROM TO SUBJECT DATE)', '']
      struct: true
    });

    fetch.on('message', (message, sequenceNumber) => {
      const prefix = '(#' + sequenceNumber + ') ';
      message.on('body', function(stream, info) {
        var buffer = '';
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', async () => {
          const result = await handleEmailData({
            mailbox,
            buffer,
            accountId,
            accountEmail,
            labelsMap,
            newKey: `EXT${externalIndex}${sequenceNumber}`,
            databaseKey
          });
          emailsToCreate[prefix] = result;

          if (Object.keys(emailsToCreate).length !== fetchUids.length) {
            return;
          }

          for (const property in emailsToCreate) {
            parsedEmails++;
            const data = emailsToCreate[property];
            try {
              await storeEmail({
                data,
                accountEmail,
                databaseKey,
                newKey: data.email.key
              });
              progressCallback({
                parsedEmails,
                totalEmails: totalEmails,
                lastEmail: data.email.key,
                type: 'progress'
              });
            } catch (e) {
              console.error(e);
            }
          }
          resolve();
        });
      });
      message.once('attributes', function(attrs) {
        //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      message.once('end', () => {
        console.log(prefix + 'Finished');
      });
    });
  });
};

const getMailLabels = (server, accountId) => {
  return new Promise((resolve, reject) => {
    server.getBoxes(async (error, mailbox) => {
      if (error) {
        reject(error);
        return;
      }
      const labelsMap = await handleLabels(Object.keys(mailbox), accountId);
      resolve(labelsMap);
    });
  });
};

const handleLabels = async (labels, accountId) => {
  const existingLabels = await getLabelsByText({
    accountId,
    text: labels
  });

  const labelsToCreate = labels
    .filter(label => {
      return (
        existingLabels.find(dbLabel => dbLabel.text === label) === undefined
      );
    })
    .map(label => {
      return {
        visible: true,
        type: 'imported',
        text: label,
        accountId: accountId
      };
    });

  await createLabel(labelsToCreate);

  const existingAllLabels = await getLabelsByText({
    accountId: accountId,
    text: labels
  });

  const labelsMap = labels.reduce((result, label) => {
    const dbLabel = existingAllLabels.find(dbLabel => dbLabel.text === label);
    return {
      ...result,
      [label.toLowerCase()]: dbLabel.id
    };
  }, {});

  return labelsMap;
};

const storeEmail = async ({ data, newKey, accountEmail, databaseKey }) => {
  await createEmail(data);
  await saveEmailBody({
    body: data ? data.body : 'No body',
    headers: '',
    metadataKey: newKey,
    username: accountEmail,
    password: databaseKey
  });
};

const handleEmailData = ({
  mailbox,
  buffer,
  accountId,
  accountEmail,
  newKey,
  labelsMap
}) => {
  return parseSimpleEmail(buffer, labelsMap, newKey, accountId, mailbox);
  /*await createEmail(result);
  await saveEmailBody({
    body: result ? result.body : 'No body',
    headers: '',
    metadataKey: newKey,
    username: accountEmail,
    password: databaseKey
  });*/
};

module.exports = {
  initConnection
};
