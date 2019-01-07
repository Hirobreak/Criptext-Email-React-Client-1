import { labels } from './systemLabels';
const { ipcRenderer, remote } = window.require('electron');
const dbManager = remote.require('./src/DBManager');
const clientManager = remote.require('./src/clientManager');
const dataTransferManager = remote.require('./src/dataTransferClient');
const socketManager = remote.require('./src/socketClient');
const globalManager = remote.require('./src/globalManager');

export const errors = remote.require('./src/errors');

export const myAccount = remote.require('./src/Account');

export const mySettings = remote.require('./src/Settings');

export const LabelType = labels;

export const { loadingType, remoteData } = remote.getGlobal('loadingData');

export const setRemoteData = data => {
  globalManager.loadingData.set(data);
};

export const sendEndLinkDevicesEvent = () => {
  ipcRenderer.send('end-link-devices-event');
};

export const downloadBackupFile = address => {
  return dataTransferManager.download(address);
};

export const decryptBackupFile = key => {
  return dataTransferManager.decrypt(key);
};

export const importDatabase = () => {
  return dataTransferManager.importDatabase();
};

export const clearSyncData = () => {
  return dataTransferManager.clearSyncData();
};

export const startSocket = jwt => {
  const data = jwt ? { jwt } : myAccount;
  socketManager.start(data);
};

export const stopSocket = () => {
  return socketManager.disconnect();
};

export const exportDatabase = () => {
  return dataTransferManager.exportDatabase();
};

export const encryptDatabaseFile = () => {
  return dataTransferManager.encrypt();
};

export const uploadDatabaseFile = randomId => {
  return dataTransferManager.upload(randomId);
};

/* DataBase
  ----------------------------- */
export const createAccount = params => {
  return dbManager.createAccount(params);
};

export const createContact = params => {
  return dbManager.createContact(params);
};

export const createLabel = params => {
  return dbManager.createLabel(params);
};

export const createTables = () => {
  return dbManager.createTables();
};

export const getAppSettings = () => {
  return dbManager.getAppSettings();
};

export const postKeyBundle = params => {
  return clientManager.postKeyBundle(params);
};

export const updateAccount = params => {
  return dbManager.updateAccount(params);
};

export const updateAppSettings = params => {
  return dbManager.updateAppSettings(params);
};
