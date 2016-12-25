import assert from 'power-assert'
import ObjectId from 'bson-objectid'
import Sinon from 'sinon'

import * as MessageService from './messageService'
import * as UserService from './userService'
import * as RoomService from './roomService'

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

describe('Clear message', () => {
  let testRoom, roomNotDeleted

  before(async () => {
    await connect()
    const testUser = await UserService.createUser({ email: 'hahaha@xxx.com' })
    testRoom = await RoomService.createRoom('test room')
    roomNotDeleted = await RoomService.createRoom('test room2')
    await MessageService.createMessage({
      body: 'message1',
      roomId: String(testRoom._id)
    }, String(testUser._id))
    await MessageService.createMessage({
      body: 'message2',
      roomId: String(testRoom._id)
    }, String(testUser._id))
    await MessageService.createMessage({
      body: 'message3',
      roomId: String(roomNotDeleted._id)
    }, String(testUser._id))
  })

  it('should validate room id', done => {
    MessageService.clearMessageByRoomId(null)
    .then(() => done('should validate'))
    .catch(() => done())
  })

  it('should delete all message by room id', async () => {
    await MessageService.clearMessageByRoomId(String(testRoom._id))
    const msgRoom1 = await MessageService.getMessageByRoomId(String(testRoom._id))
    assert.equal(msgRoom1.length, 0)

    const msgRoom2 = await MessageService.getMessageByRoomId(String(roomNotDeleted._id))
    assert.equal(msgRoom2.length, 1)
  })
})
