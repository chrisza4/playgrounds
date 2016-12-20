import Actions from '../store/Actions'

export function changeRoom(roomId) {
  return {
    type: Actions.ROOM_CHANGE,
    roomId
  }
}
