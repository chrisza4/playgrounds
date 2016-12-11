import Express from 'express'
import Http from 'http'
import SocketIO from 'socket.io'

const app = Express()
const server = Http.Server(app)
const io = SocketIO(server)

server.listen(3001)

app.get('/', function (req, res) {
  res.send('server start')
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

