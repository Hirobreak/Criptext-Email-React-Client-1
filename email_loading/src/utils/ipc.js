import { callMain } from '@criptext/electron-better-ipc/renderer';

export const closeCreatingKeysLoadingWindow = () => {
  callMain('close-create-keys-loading');
};

export const getComputerName = () => callMain('get-computer-name');

export const openMailboxWindow = () => {
  callMain('open-mailbox');
};

export const throwError = error => {
  callMain('throwError', error);
};

/* Criptext Client
   ----------------------------- */
export const acknowledgeEvents = async eventIds => {
  return await callMain('client-acknowledge-events', eventIds);
};

export const getDataReady = async () => {
  return await callMain('client-get-data-ready');
};

export const getKeyBundle = async deviceId => {
  return await callMain('client-get-key-bundle', deviceId);
};

export const linkAccept = async randomId => {
  return await callMain('client-link-accept', randomId);
};

export const linkDeny = async randomId => {
  return await callMain('client-link-deny', randomId);
};

export const postDataReady = async params => {
  return await callMain('client-post-data-ready', params);
};

export const postUser = async params => {
  return await callMain('client-post-user', params);
};

/* DataBase
   ----------------------------- */
export const createIdentityKeyRecord = async params => {
  return await callMain('db-create-identity-key-record', params);
};

export const createPreKeyRecord = async params => {
  return await callMain('db-create-prekey-record', params);
};

export const createSessionRecord = async params => {
  return await callMain('db-create-session-record', params);
};

export const createSignedPreKeyRecord = async params => {
  return await callMain('db-create-signed-prekey-record', params);
};

export const deletePreKeyPair = async params => {
  return await callMain('db-delete-prekey-pair', params);
};

export const deleteSessionRecord = async params => {
  return await callMain('db-delete-session-record', params);
};

export const getAccount = async () => {
  return await callMain('db-get-account');
};

export const getIdentityKeyRecord = async params => {
  return await callMain('db-get-identity-key-record', params);
};

export const getPreKeyPair = async params => {
  return await callMain('db-get-prekey-pair', params);
};

export const getSessionRecord = async params => {
  return await callMain('db-get-session-record', params);
};

export const getSignedPreKey = async params => {
  return await callMain('db-get-signed-prekey', params);
};

export const updateIdentityKeyRecord = async params => {
  return await callMain('db-update-identity-key-record', params);
};
