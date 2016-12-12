import { createMessage } from '../services/messageService'
import { createRoom } from './services/roomService'
import * as UserService from './services/userService'
import Uuid from 'uuid'
import Db from '../db'

async function run () {
  await Db()
  const user = await UserService.createUser({
    email: `${Uuid.v4()}@taskworld.com`
  })
  const room1 = await createRoom('Talk about warcraft')
  const room2 = await createRoom('/r/programming')
  const message1 = {
    body: 'Hello, new heroes here?',
    roomId: String(room1._id)
  }
  const message2 = {
    body: 'Hello, React rocks',
    roomId: String(room2._id)
  }
  await createMessage(message1, String(user._id))
  await createMessage(message2, String(user._id))
}

run()
