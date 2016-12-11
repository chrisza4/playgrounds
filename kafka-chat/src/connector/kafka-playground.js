import Promise from 'bluebird'
import Kafka, { Producer, Consumer } from 'kafka-node'

const client = new Kafka.Client('localhost:2181')
const producer = new Producer(client)

Promise.promisifyAll(producer)

const payloads = [
  { topic: 'chris', messages: 'hi zero', partition: 0 },
]
producer.on('ready', async function () {
  console.log('Producer ready')
  try {
    const res = await producer.createTopicsAsync(['chris'], true)
    console.log(`Topic created`)
    console.log(res)
    const res2 = await producer.sendAsync(payloads)
    console.log(res2)
  }
  catch (err) {
    console.log(`Error : ${err}`)
  }
})

producer.on('error', function (err) {
  console.log('Error initializing kafka: ', err)
})

const consumer = new Consumer(client,
  [
    { topic: 'chris' }
  ]
)

consumer.on('message', (message) => {
  console.log(`Consumer recieved:`)
  console.log(JSON.stringify(message, false, 2))
})

consumer.on('error', err => {
  console.log('Consumer error:', err)
})