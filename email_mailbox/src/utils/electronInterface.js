import { LabelType } from './const.js';
const electron = window.require('electron');
const remote = electron.remote;
const dbManager = remote.require('./src/DBManager');
const ipcRenderer = electron.ipcRenderer;

export const openComposerWindow = () => {
  ipcRenderer.send('create-composer');
};

export const getThreads = (timestamp, params) => {
  return dbManager.getThreads(timestamp, params);
};

export const getAllLabels = () => {
  return dbManager.getAllLabels();
};

export const getEmailsGroupByThreadByMatchText = filter => {
  return dbManager.getEmailsGroupByThreadByMatchText(filter);
};

export const getEmailsGroupByThreadByParams = params => {
  return dbManager.getEmailsGroupByThreadByParams(parseMailbox(params));
};

export const getEmailsByThreadId = threadId => {
  return dbManager.getEmailsByThreadId(threadId);
};

const parseMailbox = params => {
  switch (params.mailbox) {
    case 'inbox': {
      return {
        ...params,
        mailbox: LabelType[params.mailbox].id
      };
    }
    case 'spam': {
      return {
        ...params,
        mailbox: LabelType[params.mailbox].id
      };
    }
    case 'sent': {
      return {
        ...params,
        mailbox: LabelType[params.mailbox].id
      };
    }
    case 'draft': {
      return {
        ...params,
        mailbox: -1,
        getDrafts: true
      };
    }
    case 'trash': {
      return {
        ...params,
        mailbox: -1,
        getTrash: -1
      };
    }
    case 'important': {
      return {
        ...params,
        mailbox: LabelType[params.mailbox].id
      };
    }
    case 'starred': {
      return {
        ...params,
        mailbox: LabelType[params.mailbox].id
      };
    }
    default: {
      return params;
    }
  }
};
