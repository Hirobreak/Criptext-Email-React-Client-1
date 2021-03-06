const ipc = require('@criptext/electron-better-ipc');
const { app } = require('electron');
const mailboxWindow = require('../windows/mailbox');
const { downloadUpdate } = require('./../updater');
const myAccount = require('./../Account');
const wsClient = require('./../socketClient');

ipc.answerRenderer('close-mailbox', () => {
  mailboxWindow.close();
});

ipc.answerRenderer('download-update', () => {
  downloadUpdate();
});

ipc.answerRenderer('logout-app', () => {
  app.relaunch();
  app.exit(0);
});

ipc.answerRenderer('maximize-mailbox', () => {
  mailboxWindow.toggleMaximize();
});

ipc.answerRenderer('minimize-mailbox', () => {
  mailboxWindow.minimize();
});

ipc.answerRenderer('open-file-explorer', filename => {
  mailboxWindow.showFileExplorer(filename);
});

ipc.answerRenderer('open-mailbox', () => {
  wsClient.start(myAccount);
  mailboxWindow.show();
});
