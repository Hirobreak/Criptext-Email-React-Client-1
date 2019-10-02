const EventEmitter = require('events');
const emitter = new EventEmitter();

const EVENTS = {
  Up_app: 'windows-event-up-app'
};

const addEvent = (eventName, callback) => {
  emitter.addListener(eventName, callback);
};

const removeEvent = (eventName, callback) => {
  emitter.removeListener(eventName, callback);
};

const callEvent = (eventName, data) => {
  emitter.emit(eventName, data);
};

module.exports = {
  EVENTS,
  addEvent,
  callEvent,
  removeEvent
};
