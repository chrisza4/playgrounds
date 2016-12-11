import RoomModel from '../models/roomModel'
import T from 'tcomb'

export function getRoomsByUserId (userId) {
  return RoomModel.find({
    members: userId
  }).lean()
}

export function getRoomById (roomId) {
  T.string(roomId)
  return RoomModel.find({
    _id: roomId
  })
}
