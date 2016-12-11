import Promise from 'bluebird'
import Kafka, { Producer } from 'kafka-node'

const client = new Kafka.Client('localhost:2181')
const producer = new Producer(client)
let consumer = null

const subscriber = { }
let connected = false
let resolveReady = () => { }

Promise.promisifyAll(producer)


producer.on('ready', async () => {
   try {
    const res = await producer.createTopicsAsync(['chris'], false)
    console.log(`Topic created`)
    console.log(res)
    consumer = new Kafka.Consumer(client,
      [
        { topic: 'chris' }
      ]
    )
    consumer.on('message', (message) => {
      console.log(`Consumer recieved:`)

      const obj = JSON.parse(message.value)
      const toExecute = subscriber[obj.eventType]
      if (!toExecute) return
      for (const func of toExecute) {
        func(obj.message)
      }
    })

    consumer.on('error', err => {
      console.log('Consumer error:', err)
    })
    connected = true
    resolveReady(true)
   }
   catch (err) {
     console.log('producer error: ', err)
   }
})

export function init () {
  return new Promise(resolve => {
    if (connected) resolve(true)
    resolveReady = resolve
  })
}

export async function publish (eventType, message) {
  const payloads = [
    {
      topic: 'chris',
      messages: [
        JSON.stringify({
          eventType,
          message
        })
      ],
      partition: 0
    },
  ]
  const res2 = await producer.sendAsync(payloads)
  return res2
}

export function subscribe (eventType, func) {
  if (!subscriber[eventType]) subscriber[eventType] = [ ]
  subscriber[eventType].push(func)
}

export function clearAllSubscribers () {
  for (const key in subscriber) {
    delete subscriber[key]
  }
}