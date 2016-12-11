const P = require('bluebird')

const context = require('rabbit.js').createContext('amqp://localhost')
const pub = context.socket('PUBLISH')
const sub1 = context.socket('SUBSCRIBE')
const sub2 = context.socket('SUBSCRIBE')

pub.connect('alerts', () => {
  console.log('PUBLISHER CONNECT')
  P.all([
    new Promise((resolve, reject) => {
      sub1.connect('alerts', () => {
        console.log('SUB1 CONNECT')
        sub1.setEncoding('utf8');
        sub1.on('data', function(note) {
          console.log("Alarum1! %s", note);
        })
        resolve()
      })
    }),
    new Promise((resolve, reject) => {
      sub2.connect('alerts', () => {
        console.log('SUB2 CONNECT')
        sub2.setEncoding('utf8');
        sub2.on('data', function(note) {
          console.log("Alarum2! %s", note);
        })
        resolve()
      })
    }),
  ]).then(() => {
    console.log('EVERYTHING CONNECTED')

  })
})


console.log('START')
