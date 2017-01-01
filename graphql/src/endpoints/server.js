import Config from '../config'
import Http from 'http'
import cors from 'cors'
import express from 'express'
import getEventbus from './event'
import graphqlHTTP from 'express-graphql'
import io from 'socket.io'
import proxy from 'express-http-proxy'
import registerEventBus from './registerEventBus'
import schema from './graphQlSchemas'
import socketioJwt from 'socketio-jwt'

export default function createServer () {
  createExpressServer()
  const app = express()

  // TODO: Proper configuration on server port and address
  app.use('/api', proxy('http://localhost:4001'))
  app.use('/', proxy('http://localhost:3000'))
  app.listen(4000)
}

function createExpressServer () {
  const backendApp = express()
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
  backendApp.use(cors(corsOptions))
  backendApp.options('/graphql', cors(corsOptions))
  backendApp.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
      createMessage: (input) => {
        return input
      }
    },
    graphiql: true
  }))
  const server = Http.Server(backendApp)
  const socketIO = io(server)
  // TODO: Proper configuration on server port and address
  server.listen(4001)
  console.log('Running a GraphQL API server at localhost:4001/api/graphql')

  socketIO.on('connection', socketioJwt.authorize({
    secret: Config.SECRET,
    timeout: 15000
  }))
  socketIO.on('connection', () => {
    console.log('Guest connected, wait for authentication....')
  })
  socketIO.on('authenticated', (socket) => {
    console.log(`${socket.decoded_token.email} connected`)
  })

  registerEventBus(getEventbus(), socketIO)
}
