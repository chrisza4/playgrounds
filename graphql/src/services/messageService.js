import MessageModel from '../models/messageModel'
import T from 'tcomb'

export async function getMessageByRoomId (roomId) {
  T.String(roomId)
  return MessageModel.find({
    roomId
  }).lean()
}

export async function createMessage (message, ownerId) {

}
