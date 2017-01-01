import handleBackendChanges from './handleBackend'
import socketIO from 'socket.io-client'

let _socket = null

export default function connectSocket (store) {
  // TODO: Proper port
  _socket = socketIO('http://localhost:4001')
  _socket.on('connect', () => {
    console.log('Socket connected')
  })

  _socket.on('event', changes => {
    store.dispatch(handleBackendChanges(changes))
  })
  _socket.on('authenticated', () => {
    _socket.isAuthen = true
  })
}

export function authenticateSocket (token) {
  if (!_socket) throw new Error('Socket does not initialized')
  if (_socket.isAuthen) return
  _socket.emit('authenticate', { token })
}
