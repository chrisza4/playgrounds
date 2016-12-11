'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publish = undefined;

var publish = exports.publish = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(eventType, message) {
    var payloads, res2;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            payloads = [{
              topic: 'chris',
              messages: [JSON.stringify({
                eventType: eventType,
                message: message
              })],
              partition: 0
            }];
            _context2.next = 3;
            return producer.sendAsync(payloads);

          case 3:
            res2 = _context2.sent;
            return _context2.abrupt('return', res2);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function publish(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.init = init;
exports.subscribe = subscribe;
exports.clearAllSubscribers = clearAllSubscribers;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = new _kafkaNode2.default.Client('localhost:2181');
var producer = new _kafkaNode.Producer(client);
var consumer = null;

var subscriber = {};
var connected = false;
var resolveReady = function resolveReady() {};

_bluebird2.default.promisifyAll(producer);

producer.on('ready', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var res;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return producer.createTopicsAsync(['chris'], false);

        case 3:
          res = _context.sent;

          console.log('Topic created');
          console.log(res);
          consumer = new _kafkaNode2.default.Consumer(client, [{ topic: 'chris' }]);
          consumer.on('message', function (message) {
            console.log('Consumer recieved:');

            var obj = JSON.parse(message.value);
            var toExecute = subscriber[obj.eventType];
            if (!toExecute) return;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = toExecute[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var func = _step.value;

                func(obj.message);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });

          consumer.on('error', function (err) {
            console.log('Consumer error:', err);
          });
          connected = true;
          resolveReady(true);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context['catch'](0);

          console.log('producer error: ', _context.t0);

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 13]]);
})));

function init() {
  return new _bluebird2.default(function (resolve) {
    if (connected) resolve(true);
    resolveReady = resolve;
  });
}

function subscribe(eventType, func) {
  if (!subscriber[eventType]) subscriber[eventType] = [];
  subscriber[eventType].push(func);
}

function clearAllSubscribers() {
  for (var key in subscriber) {
    delete subscriber[key];
  }
}