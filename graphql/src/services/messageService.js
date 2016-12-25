
import T from 'tcomb'
import Joi from 'joi'

import * as UserService from './userService'
import MessageModel from '../models/messageModel'
import { getRoomById } from './roomService'

export async function getMessageByRoomId (roomId) {
  T.String(roomId)
  return MessageModel.find({
    roomId
  }).lean()
}

export async function createMessage (message, ownerId, deps) {
  deps = Object.assign({
    create: MessageModel.create.bind(MessageModel),
    findUserById: UserService.findById,
    findRoomById: getRoomById
  }, deps)
  T.String(ownerId)
  const v = Joi.validate(message, Joi.object().keys({
    body: Joi.string().required(),
    roomId: Joi.string().required()
  }))
  if (v.error) {
    throw v.error
  }
  const user = await deps.findUserById(ownerId)
  if (!user) {
    throw new Error('User not found')
  }
  const room = await deps.findRoomById(message.roomId)
  if (!room) {
    throw new Error('Room not found')
  }
  return deps.create({
    ...message,
    ownerId
  })
}

export async function clearMessageByRoomId (roomId, deps) {
  deps = Object.assign({
    remove: MessageModel.remove.bind(MessageModel)
  })

  T.String(roomId)
  return deps.remove({
    roomId
  })
}
