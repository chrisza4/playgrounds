import socketIO from 'socket.io-client'

export default function connectSocket () {
  // TODO: Proper port
  const socket = socketIO('http://localhost:4001')
  socket.on('connect', () => {
    console.log('Socket connected')
  })
}
