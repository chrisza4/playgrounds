'use strict'

export default function registerEventBus (eventBus, socketIO) {
  eventBus.on('event', changes => {
    socketIO.emit('event', changes)
  })
}
