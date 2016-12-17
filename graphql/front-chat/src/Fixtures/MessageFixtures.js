import _ from 'lodash'

export default function createFixtures () {
  const result = [
    {
      _id: 'message1',
      body: 'hahahahahahahaha',
      ownerId: 'user1',
      roomId: 'room1',
      created: new Date()
    },
    {
      _id: 'message2',
      body: 'wtf',
      ownerId: 'user1',
      roomId: 'room1',
      created: new Date()
    },
    {
      _id: 'message3',
      body: 'listen',
      ownerId: 'user1',
      roomId: 'room1',
      created: new Date()
    },
  ]
  return _.keyBy(result, t => t._id)
}
