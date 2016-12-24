import handleBackendChanges from './handleBackend'
import socketIO from 'socket.io-client'

export default function connectSocket (store) {
  // TODO: Proper port
  const socket = socketIO('http://localhost:4001')
  socket.on('connect', () => {
    console.log('Socket connected')
  })

  socket.on('event', changes => {
    store.dispatch(handleBackendChanges(changes))
  })
}
