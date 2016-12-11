'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = new _kafkaNode2.default.Client('localhost:2181');
var producer = new _kafkaNode.Producer(client);

_bluebird2.default.promisifyAll(producer);

var payloads = [{ topic: 'chris', messages: 'hi zero', partition: 0 }];
producer.on('ready', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var res, res2;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Producer ready');
          _context.prev = 1;
          _context.next = 4;
          return producer.createTopicsAsync(['chris'], true);

        case 4:
          res = _context.sent;

          console.log('Topic created');
          console.log(res);
          _context.next = 9;
          return producer.sendAsync(payloads);

        case 9:
          res2 = _context.sent;

          console.log(res2);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context['catch'](1);

          console.log('Error : ' + _context.t0);

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[1, 13]]);
})));

producer.on('error', function (err) {
  console.log('Error initializing kafka: ', err);
});

var consumer = new _kafkaNode.Consumer(client, [{ topic: 'chris' }]);

consumer.on('message', function (message) {
  console.log('Consumer recieved:');
  console.log(JSON.stringify(message, false, 2));
});

consumer.on('error', function (err) {
  console.log('Consumer error:', err);
});