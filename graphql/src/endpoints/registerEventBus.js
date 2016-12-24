'use strict'

export default function registerEventBus (eventBus, socketIO) {
  eventBus.on('event', changes => {
    console.log('SOCKETEMIT')
    socketIO.emit('event', changes)
  })
}
