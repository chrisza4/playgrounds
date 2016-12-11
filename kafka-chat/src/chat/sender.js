import * as Events from '../connector/events'

export function publishChat (username, message) {
  Events.publish('chat', {
    username, message
  })
}