import * as MessageService from '../services/messageService'
import * as RoomService from '../services/roomService'
import * as UserService from '../services/userService'

import assert from 'power-assert'
import connect from '../db'
import { graphql } from 'graphql'
import schemas from '../endpoints/graphQlSchemas'

describe('Room endpoint query tests', () => {
  let room2, user

  before(async () => {
    await connect()
    user = await UserService.createUser({ email: 'test@test.com' })
    const room = await RoomService.createRoom('Test room')
    await MessageService.createMessage({
      body: 'Message1',
      roomId: String(room._id)
    }, String(user._id))
    room2 = await RoomService.createRoom('Test room2')
    await MessageService.createMessage({
      body: 'Message in room2',
      roomId: String(room2._id)
    }, String(user._id))
  })

  it('should get room and messages', async () => {
    const query = `query {
      rooms {
        title
        messages {
          _id
          body
        }
      }
    }`
    const result = await graphql(schemas, query)
    assert(result.data.rooms.length === 2)
    assert(result.data.rooms[0].title === 'Test room')
    assert(result.data.rooms[0].messages[0].body === 'Message1')
  })

  it('should get messages by room id', async () => {
    const query = `query {
      messages(roomId: "${String(room2._id)}") {
        _id
        body
      }
    }`
    const result = await graphql(schemas, query)
    assert(result.data.messages.length === 1)
    assert.equal(result.data.messages[0].body, 'Message in room2')
  })

  describe('message mutation', () => {
    it('should be able to create message', async () => {
      const query = `mutation {
        createMessage(message: {
          body: "HELLO",
          roomId: "${String(room2._id)}"
          email: "test@test.com"
        }) {
          _id
          body
        }
      }`
      const createResult = await graphql(schemas, query)
      if (createResult.errors) {
        console.log(JSON.stringify(createResult.errors, false, 2))
      }
      assert.equal(createResult.data.createMessage.body, 'HELLO')

      const roomQuery = `query {
        messages(roomId: "${String(room2._id)}") {
          _id
          body
          ownerId
        }
      }`
      const result = await graphql(schemas, roomQuery)
      assert(result.data.messages.length === 2)
      const newMessage = result.data.messages.find(d => d.body === 'HELLO')
      assert.equal(newMessage.ownerId, String(user._id))
    })
  })
})
