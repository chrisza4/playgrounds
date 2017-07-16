const rabbit = require('rabbit.js')

function initRabbit () {
  const context = rabbit.createContext('amqp://localhost')
  const pub = context.socket('PUBLISH')
  aaa = 2
}
