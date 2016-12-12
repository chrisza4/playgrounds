import RoomModel from '../models/roomModel'
import T from 'tcomb'

export function getRoomsByUserId (userId) {
  return RoomModel.find({
    members: userId
  }).lean()
}

export function getRoomById (roomId) {
  T.String(roomId)
  return RoomModel.findOne({
    _id: roomId
  }).lean()
}

export function getAllRooms () {
  return RoomModel.find({
  }).lean()
}

export function createRoom (title) {
  T.String(title)
  return RoomModel.create({
    title,
    members: [ ]
  })
}
