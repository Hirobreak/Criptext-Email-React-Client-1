/* eslint-env node, jest */
// const DBManager = require('../database/DBManager');
const DBManager = require('../database');
const systemLabels = require('./../systemLabels');

const emailDraft = {
  email: {
    threadId: 'threadA',
    key: '1',
    s3Key: 's3KeyA',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2013-10-07 08:23:19.120',
    status: 0,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdA',
    fromAddress: '<User me> <user@criptext.com>'
  },
  recipients: {
    from: ['<User me> <user@criptext.com>'],
    to: ['userf@criptext.com']
  },
  labels: [5, 6] // 3,6
};

const emailSent = {
  email: {
    threadId: 'threadB',
    key: '2',
    s3Key: 's3KeyB',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2013-10-07 08:23:19.120',
    status: 1,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdB',
    fromAddress: 'User me <user@criptext.com>'
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['usera@criptext.com', 'userb@criptext.com'],
    cc: ['userc@criptext.com'],
    bcc: ['userd@criptext.com']
  },
  labels: [3]
};

const emailInbox = {
  email: {
    threadId: 'threadC',
    key: '3',
    s3Key: 's3KeyC',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2018-06-14 08:23:19.120',
    status: 0,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdC',
    fromAddress: 'User A <usera@criptext.com>'
  },
  recipients: {
    from: ['User A <usera@criptext.com>'],
    to: ['user@criptext.com', 'userb@criptext.com'],
    cc: ['userc@criptext.com'],
    bcc: ['userd@criptext.com']
  },
  labels: [1],
  files: [
    {
      token: 'tokenC',
      name: 'Criptext_Image_2018_06_14.png',
      readOnly: false,
      size: 183241,
      status: 1,
      date: '2018-06-14T23:45:57.466Z',
      mimeType: 'image/png'
    }
  ]
};

const emailReply = {
  email: {
    threadId: 'threadC',
    key: '4',
    s3Key: 's3KeyD',
    subject: 'Greetings',
    content: '<p>RE: Hello there</p>',
    preview: 'RE: Hello there',
    date: '2018-06-15 08:23:19.120',
    status: 0,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdD',
    fromAddress: 'user@criptext.com'
  },
  recipients: {
    from: ['user@criptext.com'],
    to: ['usera@criptext.com']
  },
  labels: [3]
};

const emailSpam = {
  email: {
    threadId: 'threadE',
    key: '5',
    s3Key: 's3KeyE',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2018-09-11 14:38:19.120',
    status: 5,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    trashDate: null,
    messageId: 'messageIdE',
    fromAddress: 'user@criptext.com'
  },
  recipients: {
    from: ['user@criptext.com'],
    to: ['usera@criptext.com']
  },
  labels: [2]
};

const emailStarred = {
  email: {
    threadId: 'threadF',
    key: '6',
    s3Key: 's3KeyF',
    subject: 'Greetings there',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2013-09-11 08:23:19.120',
    status: 5,
    unread: false,
    secure: false,
    unsendDate: '2018-06-14 08:23:20.000',
    trashDate: null,
    messageId: 'messageIdF',
    fromAddress: 'User me <user@criptext.com>'
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['usera@criptext.com', 'userb@criptext.com']
  },
  labels: [5]
};

const emailScore = {
  email: {
    threadId: 'threadG',
    key: '7',
    s3Key: 's3KeyG',
    subject: 'Greetings there',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2014-09-11 09:23:19.120',
    status: 5,
    unread: false,
    secure: false,
    unsendDate: '2018-06-14 08:23:20.000',
    trashDate: null,
    messageId: 'messageIdG',
    fromAddress: 'User me <user@criptext.com>'
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['userscore@criptext.com'],
    cc: ['usera@criptext.com'],
    bcc: ['userb@criptext.com']
  },
  labels: [3]
};

const emailUpdate = {
  email: {
    threadId: 'threadH',
    key: '8',
    s3Key: 's3KeyH',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2013-10-07 08:23:20.120',
    status: 1,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdH',
    fromAddress: 'User me <user@criptext.com>'
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['usera@criptext.com', 'userb@criptext.com']
  },
  labels: [3]
};

const emailToSearch = {
  email: {
    threadId: 'threadIdSearch',
    key: '9',
    s3Key: 's3KeyI',
    subject: 'Lorem ipsum is amet',
    content: '<p>Find me!</p>',
    preview: 'Find me!',
    date: '2019-02-26 16:55:25.000',
    status: 1,
    unread: true,
    secure: true,
    messageId: 'messageIdI',
    fromAddress: 'Alice <alice@criptext.com>'
  },
  recipients: {
    from: ['Alice <alice@criptext.com>'],
    to: ['bob@criptext.com']
  },
  labels: [6]
};

const draftToReplaceOld = {
  email: {
    threadId: 'threadJ',
    key: '10',
    s3Key: 's3KeyJ',
    subject: 'New Draft',
    content: '<p>I am a edited draft</p>',
    preview: 'I am a edited draft',
    date: '2013-03-01 16:44:00.000',
    status: 0,
    unread: false,
    secure: true,
    messageId: 'messageIdJ',
    fromAddress: '<User me> <user@criptext.com>'
  },
  recipients: {
    from: ['<User me> <user@criptext.com>'],
    to: ['toUser@criptext.com']
  },
  labels: [6]
};

const emailUpdateLabels = {
  email: {
    threadId: 'threadK',
    key: '12',
    s3Key: 's3KeyK',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2013-10-07 08:23:20.120',
    status: 1,
    unread: false,
    secure: true,
    messageId: 'messageIdK',
    fromAddress: 'User me <user@criptext.com>'
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['usera@criptext.com']
  },
  labels: [3, 7]
};

const emailReReply = {
  email: {
    threadId: 'threadC',
    key: '14',
    s3Key: 's14KeyC',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2018-06-14 08:23:19.120',
    status: 0,
    unread: true,
    secure: true,
    unsendDate: '2018-06-14 08:23:20.000',
    messageId: 'messageIdL',
    fromAddress: 'User A <usera@criptext.com>'
  },
  recipients: {
    from: ['User A <usera@criptext.com>'],
    to: ['user@criptext.com']
  },
  labels: [1, 7]
};

const emailTrash = {
  email: {
    threadId: 'threadK',
    key: '15',
    s3Key: 's15KeyK',
    subject: 'Greetings',
    content: '<p>Hello there</p>',
    preview: 'Hello there',
    date: '2018-10-25 08:23:20.120',
    status: 1,
    unread: false,
    secure: true,
    messageId: 'messageIdK',
    fromAddress: 'User me <user@criptext.com>',
    trashDate: '2018-10-25 08:30:20.120',
  },
  recipients: {
    from: ['User me <user@criptext.com>'],
    to: ['usera@criptext.com']
  },
  labels: [3, 7]
};

const insertEmails = async () => {
  await DBManager.createEmail(emailDraft);
  await DBManager.createEmail(emailSent);
  await DBManager.createEmail(emailInbox);
  await DBManager.createEmail(emailReply);
  await DBManager.createEmail(emailSpam);
  await DBManager.createEmail(emailStarred);
  await DBManager.createEmail(emailUpdate);
  await DBManager.createEmail(emailToSearch);
};

beforeAll(async () => {
  // await DBManager.cleanDataBase();
  // await DBManager.createTables();
  await DBManager.deleteDatabase();
  await DBManager.initDatabaseEncrypted('1111', true);
  await insertEmails();
});

let emailIdToDelete;

describe('Store data email to Email Table:', () => {
  it('should insert email to database', async () => {
    const email = await DBManager.createEmail({
      email: {
        threadId: 'threadId',
        key: '11',
        s3Key: 's3KeyId',
        subject: 'Greetings',
        content: '<p>Hello there</p>',
        preview: 'Hello there',
        date: '2018-06-14 08:23:19.120',
        status: 0,
        unread: true,
        secure: true,
        unsendDate: '2018-06-14 08:23:20.000',
        messageId: 'messageId',
        fromAddress: 'From Contact <from@criptext.com>'
      }
    });
    expect(email).toMatchSnapshot();
  });

  it('should insert email with threadId exist to database', async () => {
    const email = await DBManager.createEmail({
      email: {
        threadId: 'threadB',
        key: '13',
        s3Key: 's3KeyId',
        subject: 'Greetings',
        content: '<p>Hello there</p>',
        preview: 'Hello there',
        date: '2018-06-14 08:23:19.120',
        status: 0,
        unread: true,
        secure: true,
        unsendDate: '2018-06-14 08:23:20.000',
        messageId: 'messageId',
        fromAddress: 'From Contact <usera@criptext.com>'
      },
      recipients: {
        from: ['usera@criptext.com'],
        to: ['user@criptext.com']
      },
      labels: [1]
    });
    emailIdToDelete = email.id;
    expect(email).toMatchSnapshot();
  });
});

describe('Store relation data to EmailLabel Table: ', () => {
  it('Should insert emailLabel relation to database: (starred and trash)', async () => {
    const [email] = await DBManager.getEmailByKey(emailUpdate.email.key);
    const emailLabelToInsert = [
      { emailId: email.id, labelId: systemLabels.starred.id },
      { emailId: email.id, labelId: systemLabels.trash.id }
    ];
    const response = await DBManager.createEmailLabel(emailLabelToInsert);
    expect(response.length).toBe(2);
    expect(response[0]).toMatchObject({ emailId: 7, id: 11, labelId: 5 });
    expect(response[1]).toMatchObject({ emailId: 7, id: 12, labelId: 7 });
    const result = await DBManager.getEmailByKey(emailUpdate.email.key);
    expect(result.length).toBe(1);
    const emailUpdated = result[0];
    expect(email.trashDate).toBeNull();
    expect(emailUpdated.trashDate).toBeDefined();
  });

  it('Should not insert emailLabel relation to database', async () => {
    const [email] = await DBManager.getEmailByKey(emailDraft.email.key);
    const emailLabelDraft = [
      { emailId: email.id, labelId: systemLabels.draft.id }
    ];
    const response = await DBManager.createEmailLabel(emailLabelDraft);
    expect(response).toBeUndefined();
  });

  it('Should Add and Remove emailLabel relation to database: (starred)', async () => {
    await DBManager.createEmail(emailUpdateLabels);
    const [email] = await DBManager.getEmailByKey(emailUpdateLabels.email.key);
    // Add
    const emailLabelToAdd = [
      { emailId: email.id, labelId: systemLabels.starred.id }
    ];
    const addResponse = await DBManager.createEmailLabel(emailLabelToAdd);
    expect(addResponse.length).toBe(1);
    expect(addResponse[0]).toMatchObject({ emailId: 11, id: 15, labelId: 5 });
    // Remove
    const result = await DBManager.deleteEmailLabel({
      emailIds: [email.id],
      labelIds: [systemLabels.starred.id]
    });
    expect(result).toBe(1);
    // Check if exists
    let existsRelation = false;
    const remainingEmailLabels = await DBManager.getEmailLabelsByEmailId(
      email.id
    );
    for (const remainingLabel of remainingEmailLabels) {
      const { labelId } = remainingLabel;
      if (labelId === systemLabels.starred.id) {
        existsRelation = true;
        break;
      }
    }
    expect(existsRelation).toBe(false);
  });
});

describe('Load data emails from Email Table:', () => {
  it('should load emails from DB with label id: Sent', async () => {
    const labelIds = [3];
    const emails = await DBManager.getEmailsByLabelIds(labelIds);
    expect(emails.length).toBe(4);
    expect(emails[0].key).toBe(emailSent.email.key);
    expect(emails[1].key).toBe(emailReply.email.key);
    expect(emails[2].key).toBe(emailUpdate.email.key);
    expect(emails[3].key).toBe(emailUpdateLabels.email.key);
    expect(emails[0]).toMatchSnapshot();
  });

  it('should load emails by threadId and labelId', async () => {
    const emails = await DBManager.getEmailsByThreadIdAndLabelId(
      [emailSent.email.threadId],
      systemLabels.inbox.id
    );
    expect(emails.length).toBe(1);
    expect(emails[0]).toMatchSnapshot();
  });

  it('should load email by key', async () => {
    const emails = await DBManager.getEmailByKey(emailSent.email.key);
    expect(emails.length).toBe(1);
    expect(emails[0]).toMatchSnapshot();
  });

  it('should load emails by array params', async () => {
    const emails = await DBManager.getEmailsByArrayParam({ ids: [1] });
    expect(emails.length).toBe(1);
    expect(emails[0]).toMatchSnapshot();
  });
});

describe('Update data email to Email Table:', () => {
  it('should update email: unread by id', async () => {
    const id = 3;
    const result = await DBManager.updateEmail({
      id,
      unread: false
    });
    expect(result).toEqual(expect.arrayContaining([1]));
    const [email] = await DBManager.getEmailsByArrayParam({ ids: [id] });
    const unread = email.unread;
    expect(unread).toBe(false);
  });

  it('should update emails: unread by keys', async () => {
    const keys = [3, 11];
    const result = await DBManager.updateEmails({
      keys,
      unread: false
    });
    expect(result).toEqual(expect.arrayContaining([2]));
    const emails = await DBManager.getEmailsByArrayParam({ keys });
    expect(emails.length).toBe(2);
    const unreadEmailA = emails[0].unread;
    const unreadEmailB = emails[1].unread;
    expect(unreadEmailA).toBe(false);
    expect(unreadEmailB).toBe(false);
  });

  it('should not update emails: unread by keys', async () => {
    const keys = [100, 101];
    const result = await DBManager.updateEmails({
      keys,
      unread: false
    });
    expect(result).toEqual(expect.arrayContaining([0]));
  });

  it('should update email: status by key', async () => {
    const key = 2;
    const result = await DBManager.updateEmail({
      key,
      status: 6
    });
    expect(result).toEqual(expect.arrayContaining([1]));
    const [email] = await DBManager.getEmailByKey(key);
    const status = email.status;
    expect(status).toBe(6);
  });

  it('should update emails: trashDate after insert emailLabel trash', async () => {
    const [email] = await DBManager.getEmailByKey(emailStarred.email.key);
    const emailLabelTrash = [
      { emailId: email.id, labelId: systemLabels.trash.id }
    ];
    await DBManager.createEmailLabel(emailLabelTrash);
    const updatedEmails = await DBManager.getEmailsByThreadIdAndLabelId(
      [emailStarred.email.threadId],
      systemLabels.trash.id
    );
    const updatedEmail = updatedEmails;
    expect(updatedEmails.length).toBe(1);
    expect(typeof updatedEmail).toBe('object');
    expect(new Date(updatedEmail.trashDate)).toEqual(expect.any(Date));
  });

  it('should not update emails: trashDate after insert emailLabel trash', async () => {
    const [email] = await DBManager.getEmailByKey(emailSpam.email.key);
    const emailLabelStarred = [
      { emailId: email.id, labelId: systemLabels.starred.id }
    ];
    await DBManager.createEmailLabel(emailLabelStarred);
    const updatedEmails = await DBManager.getEmailsByThreadIdAndLabelId(
      [emailSpam.email.threadId],
      systemLabels.starred.id
    );
    const updatedEmail = updatedEmails[0];
    expect(updatedEmails.length).toBe(1);
    expect(typeof updatedEmail).toBe('object');
    expect(updatedEmail.trashDate).toBeNull();
  });
});

describe('Delete emails from Email Table:', () => {
  it('Should delete email from DB by key', async () => {
    const keysToDelete = [emailSpam.email.key];
    const result = await DBManager.deleteEmailByKeys(keysToDelete);
    expect(result).toBe(1);
    const [email] = await DBManager.getEmailByKey(emailSpam.email.key);
    expect(email).toBeUndefined();
  });

  it('Should not delete email from DB by key', async () => {
    const keysToDelete = [emailSpam.email.key];
    const result = await DBManager.deleteEmailByKeys(keysToDelete);
    expect(result).toBe(0);
  });

  it('Should delete emails from DB by ids', async () => {
    const idsToDelete = [emailIdToDelete];
    const result = await DBManager.deleteEmailsByIds(idsToDelete);
    expect(result).toBe(1);
  });

  it('Should not delete emails from DB by ids', async () => {
    const idsToDelete = [emailIdToDelete];
    const result = await DBManager.deleteEmailsByIds(idsToDelete);
    expect(result).toBe(0);
  });

  it('Should delete emails from DB by threadId and labelId', async () => {
    await DBManager.createEmail(emailReReply);
    const threadIds = [emailReReply.email.threadId];
    const labelId = 7;
    const result = await DBManager.deleteEmailsByThreadIdAndLabelId(
      threadIds,
      labelId
    );
    expect(result).toBe(1);
    const emailDeleted = await DBManager.getEmailByKey(emailReReply.email.key);
    expect(emailDeleted).toEqual([]);
  });

  it('Should delete emails from DB by only threadId', async () => {
    await DBManager.createEmail(emailReReply);
    const threadIds = [emailReReply.email.threadId];
    const result = await DBManager.deleteEmailsByThreadIdAndLabelId(
      threadIds
    );
    expect(result).toBe(1);
    const emailDeleted = await DBManager.getEmailByKey(emailReReply.email.key);
    expect(emailDeleted).toEqual([]);
  });

  it('Should delete emails expired fromDB', async ()=> {
    await DBManager.createEmail(emailTrash);
    const a = await DBManager.getTrashExpiredEmails();
    const b = a.map(i=> {return i.id});
    console.log(b);
  });
});

describe('Load data thread from Email Table:', () => {
  it('should load drafts, not save [to] recepient and save the others[cc, bcc]', async () => {
    const emails = await DBManager.getEmailsByThreadId('threadA');
    expect(emails.length).toBe(1);
    const email = emails[0];
    const { bcc, cc, to, labelIds } = email;
    const numbersSeparatedByCommasRegex = /[0-9]+((,){1}[0-9]+)*/;
    expect(to).toMatch(numbersSeparatedByCommasRegex);
    expect(cc).toBeNull();
    expect(bcc).toBeNull();
    expect(labelIds).toBe('5,6');
    expect(email).toMatchSnapshot();
  });

  it('should save a restored draft deleting the previous one', async () => {
    const [oldDraftBeforeReplace] = await DBManager.getEmailByKey(
      emailDraft.email.key
    );
    const [newDraftBeforeReplace] = await DBManager.getEmailByKey(
      draftToReplaceOld.email.key
    );
    await DBManager.deleteEmailAndRelations(
      oldDraftBeforeReplace.id,
      draftToReplaceOld
    );
    const [oldDraftAfterReplace] = await DBManager.getEmailByKey(
      emailDraft.email.key
    );
    const [newDraftAfterReplace] = await DBManager.getEmailByKey(
      draftToReplaceOld.email.key
    );
    expect(oldDraftBeforeReplace.key).toBe(emailDraft.email.key);
    expect(newDraftBeforeReplace).toBeUndefined();
    expect(oldDraftAfterReplace).toBeUndefined();
    expect(newDraftAfterReplace.key).toBe(draftToReplaceOld.email.key);
  });

  it('should load sent email with recipients', async () => {
    const emails = await DBManager.getEmailsByThreadId('threadB');
    expect(emails.length).toBe(1);
    const email = emails[0];
    const { bcc, cc, to } = email;
    const numbersSeparatedByCommasRegex = /[0-9]+((,){1}[0-9]+)*/;
    expect(to).toMatch(numbersSeparatedByCommasRegex);
    expect(cc).toMatch(numbersSeparatedByCommasRegex);
    expect(bcc).toMatch(numbersSeparatedByCommasRegex);
  });

  it('should load inboxs with files', async () => {
    const emails = await DBManager.getEmailsByThreadId('threadC');
    expect(emails.length).toBe(2);
    const email = emails[0];
    const fileTokens = email.fileTokens;
    expect(fileTokens).toBe('tokenC');
  });

  it('should load threads from DB with the correct shape: inbox', async () => {
    const params = {
      labelId: 1,
      rejectedLabelIds: [2, 6]
    };
    const threads = await DBManager.getEmailsGroupByThreadByParams(params);
    expect(threads).toMatchSnapshot();
  });

  it('should load threads from DB with the correct shape: sent', async () => {
    const params = {
      labelId: 3,
      rejectedLabelIds: [2, 7]
    };
    const threads = await DBManager.getEmailsGroupByThreadByParams(params);
    expect(threads).toMatchSnapshot();
  });

  it('should load threads from DB with the correct shape: inbox. Scroll action', async () => {
    const params = {
      labelId: 1,
      rejectedLabelIds: [2, 7],
      limit: 1
    };
    const [lastThread] = await DBManager.getEmailsGroupByThreadByParams(params);
    const maxDate = lastThread.maxDate;
    const threadIdRejected = lastThread.threadId;
    expect(lastThread).toMatchObject(
      expect.objectContaining({
        threadId: 'threadC',
        emailIds: '4,3'
      })
    );
    const moreParams = {
      labelId: 1,
      rejectedLabelIds: [2, 7],
      limit: 1,
      date: maxDate,
      threadIdRejected
    };
    const moreLastThreads = await DBManager.getEmailsGroupByThreadByParams(
      moreParams
    );
    expect(moreLastThreads).toEqual([]);
  });

  it('should load threads from DB with the correct shape: search', async () => {
    const threadIdToSearch = emailToSearch.email.threadId;
    const plainParamsSubject = {
      plain: true,
      text: 'Find me',
      labelId: -2,
      rejectedLabelIds: [2, 7]
    };
    const plainParamsPreview = {
      plain: true,
      text: 'Lorem',
      labelId: -2,
      rejectedLabelIds: [2, 7]
    };
    const specificParamsFrom = {
      contactFilter: { from: 'Alice' },
      contactTypes: ['from'],
      labelId: -2,
      rejectedLabelIds: [2, 7]
    };
    const specificParamsTo = {
      contactFilter: { to: 'bob' },
      contactTypes: ['to'],
      labelId: -2,
      rejectedLabelIds: [2, 7]
    };
    const [
      plainSubjectFound
    ] = await DBManager.getEmailsGroupByThreadByParams(
      plainParamsSubject
    );
    const [
      plainPreviewFound
    ] = await DBManager.getEmailsGroupByThreadByParams(
      plainParamsPreview
    );
    const [
      specificFromFound
    ] = await DBManager.getEmailsGroupByThreadByParams(
      specificParamsFrom
    );
    const [specificToFound] = await DBManager.getEmailsGroupByThreadByParams(
      specificParamsTo
    );

    expect(plainSubjectFound.threadId).toBe(threadIdToSearch);
    expect(plainPreviewFound.threadId).toBe(threadIdToSearch);
    expect(specificFromFound.threadId).toBe(threadIdToSearch);
    expect(specificToFound.threadId).toBe(threadIdToSearch);
  });
});

describe('Update data contact to Contact Table: ', () => {
  it('Should update contact score to 1 after inserting email', async () => {
    const contacts = await DBManager.getContactByEmails([
      ...emailScore.recipients.to,
      emailScore.recipients.cc,
      emailScore.recipients.bcc
    ]);
    expect(contacts.length).toBe(2);
    expect(contacts[0].email).toBe(emailScore.recipients.cc[0]);
    expect(contacts[0].score).toBe(5);
    expect(contacts[1].email).toBe(emailScore.recipients.bcc[0]);
    expect(contacts[1].score).toBe(2);
    await DBManager.createEmail(emailScore);
    const contactsUpdated = await DBManager.getContactByEmails([
      ...emailScore.recipients.to,
      emailScore.recipients.cc,
      emailScore.recipients.bcc
    ]);
    expect(contactsUpdated.length).toBe(3);
    expect(contactsUpdated[0].email).toBe(emailScore.recipients.cc[0]);
    expect(contactsUpdated[0].score).toBe(6);
    expect(contactsUpdated[1].email).toBe(emailScore.recipients.bcc[0]);
    expect(contactsUpdated[1].score).toBe(3);
    expect(contactsUpdated[2].email).toBe(emailScore.recipients.to[0]);
    expect(contactsUpdated[2].score).toBe(1);
  });

  it('Should update contact spamScore to 1 from email Inbox', async () => {
    const contacts = await DBManager.getContactByEmails(['usera@criptext.com']);
    expect(contacts.length).toBe(1);
    expect(contacts[0].spamScore).toBe(0);
    // Add spamScore
    const [email] = await DBManager.getEmailByKey(emailInbox.email.key);
    const contactsUpdated = await DBManager.updateContactSpamScore({
      emailIds: [email.id, 2, 3, 4],
      notEmailAddress: 'user@criptext.com',
      value: 1
    });
    expect(contactsUpdated).toEqual([1]);
    const contactUpdated = await DBManager.getContactByEmails([
      'usera@criptext.com'
    ]);
    expect(contactUpdated[0].spamScore).toBe(1);
    //Less spamScore
    const contactsUpdatedAgain = await DBManager.updateContactSpamScore({
      emailIds: [email.id],
      notEmailAddress: 'user@criptext.com',
      value: -1
    });
    expect(contactsUpdatedAgain).toEqual([1]);
    const contactUpdatedAgain = await DBManager.getContactByEmails([
      'usera@criptext.com'
    ]);
    expect(contactUpdatedAgain[0].spamScore).toBe(0);
  });

  it('Should not update contact spamScore to 1 from sent Inbox', async () => {
    const contacts = await DBManager.getContactByEmails(['user@criptext.com']);
    expect(contacts.length).toBe(1);
    expect(contacts[0].spamScore).toBe(0);
    const [email] = await DBManager.getEmailByKey(emailSent.email.key);
    const contactsUpdated = await DBManager.updateContactSpamScore({
      emailIds: [email.id],
      notEmailAddress: 'user@criptext.com',
      value: 1
    });
    expect(contactsUpdated).toEqual([0]);
    const contactUpdated = await DBManager.getContactByEmails([
      'user@criptext.com'
    ]);
    expect(contactUpdated[0].spamScore).toBe(0);
  });
});

describe('Filter data emaiLabel from EmailLabel Table: ', () => {
  it('Should filter and return empty relations', async () => {
    const emailLabels = await DBManager.filterEmailLabelIfNotStore([
      { labelId: 3, emailId: 11 },
      { labelId: 7, emailId: 11 }
    ]);
    expect(emailLabels).toEqual([]);
  });

  it('Should filter and return 2 relations', async () => {
    const relations = [
      { labelId: 3, emailId: 100 },
      { labelId: 7, emailId: 101 }
    ];
    const emailLabels = await DBManager.filterEmailLabelIfNotStore(relations);
    expect(emailLabels).toMatchObject(relations);
  });
});

describe('Load data emaiLabel from EmailLabel Table: ', () => {
  it('Should load data emailLabel by emailId', async () => {
    const emailLabels = await DBManager.getEmailLabelsByEmailId(6);
    expect(emailLabels).toMatchSnapshot();
  });

  it('Should not load data emailLabel by emailId', async () => {
    const emailLabels = await DBManager.getEmailLabelsByEmailId(1);
    expect(emailLabels).toEqual([]);
  });
});
