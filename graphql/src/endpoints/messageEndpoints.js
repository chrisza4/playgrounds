import * as MessageService from '../services/messageService'
import * as UserService from '../services/userService'

import { publishChanges } from './event'

export async function createMessageEndpoint (message, opts) {
  opts = Object.assign({
    findByEmail: UserService.findByEmail,
    createMessage: MessageService.createMessage,
    publishChanges: publishChanges
  }, opts)
  const user = await opts.findByEmail(message.email)
  const toSave = {
    body: message.body,
    roomId: message.roomId
  }
  const result = await opts.createMessage(toSave, String(user._id))
  opts.publishChanges({
    type: 'message:changes',
    roomId: message.roomId
  })
  return result
}
