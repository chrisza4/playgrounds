export default function createFixtures () {
  return [
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
}
