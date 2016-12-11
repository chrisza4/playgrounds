import Promise from 'bluebird'
import { expect } from 'chai'
import * as Events from './events'

describe('Events', () => {

  before(async () => {
    await Events.init()
  })

  afterEach(() => {
    Events.clearAllSubscribers()
  })

  it('should able to publish and subscribe', done => {

    Events.subscribe('msg1', (message) => {
      expect(message.hey).to.equal('you')
      done()
    })

    Events.subscribe('msg2', (message) => {
      done('No!!!')
    })

    Events.publish('msg1', { hey: 'you' })
  })

  it('should trigger all subscriber', async () => {
    const subscriber1 = new Promise(resolve => {
      Events.subscribe('msg4', message => {
        resolve()
      })
    })
    const subscriber2 = new Promise(resolve => {
      Events.subscribe('msg4', message => {
        resolve()
      })
    })
    Events.publish('msg4', { f: 'you' })
    return Promise.all([
      subscriber1,
      subscriber2,
    ])
  })

})