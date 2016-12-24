import * as RoomActions from './Rooms/actions'

export default function handleBackend (changes) {
  switch (changes.type) {
    case 'message:changes': {
      return RoomActions.fetchRoom(changes.roomId)
    }
    default: break
  }
}
