'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishChat = publishChat;

var _events = require('../connector/events');

var Events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function publishChat(username, message) {
  Events.publish('chat', {
    username: username, message: message
  });
}