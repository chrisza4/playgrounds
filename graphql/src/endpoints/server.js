// const express = require('express')
// const graphqlHTTP = require('express-graphql')
// const { buildSchema } = require('graphql')
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './graphQlSchemas'
import io from 'socket.io'
import Http from 'http'
import proxy from 'express-http-proxy'

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
  backendApp.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: { },
    graphiql: true
  }))
  const server = Http.Server(backendApp)
  const socketIO = io(server)
  // TODO: Proper configuration on server port and address
  server.listen(4001)
  console.log('Running a GraphQL API server at localhost:4001/api/graphql')

  socketIO.on('connection', socket => {
    console.log('USER CONNECTED')
  })
}

