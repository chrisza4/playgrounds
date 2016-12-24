import assert from 'power-assert'
import ObjectId from 'bson-objectid'
import Sinon from 'sinon'

import * as MessageService from './messageService'
import * as UserService from './userService'

import connect from '../db'

describe('Create message', () => {

  let testUser

  before(async () => {
    await connect()
    testUser = await UserService.createUser({ email: 'test@test.com' })
  })

  it('should validate owner type', done => {
    MessageService.createMessage({ body: 'hello' })
    .then(r => {
      done('Why you no validate type!!!')
    })
    .catch(err => {
      assert(err.message.startsWith('[tcomb]'))
      done()
    })
  })

  it('should validate if owner exists', (done) => {
    MessageService.createMessage({
      body: 'hello',
      roomId: 'room1'
    }, String(ObjectId.generate()))
    .then(result => {
      done('should failed because user does not exists')
    })
    .catch(err => {
      assert(err.message === 'User not found')
      done()
    })
  })

  it('should create message correctly', async () => {
    const deps = {
      create: Sinon.stub().returns(Promise.resolve({ })),
      findRoomById: Sinon.stub().returns(Promise.resolve({ _id: 'room1' }))
    }
    const messageToCreate = {
      body: 'hello world',
      roomId: 'room1'
    }
    await MessageService.createMessage(messageToCreate, String(testUser._id), deps)
    assert(deps.create.called)
    const messageCreated = deps.create.args[0][0]
    assert(messageCreated.body === messageToCreate.body)
    assert(messageCreated.roomId === messageToCreate.roomId)
  })
})
