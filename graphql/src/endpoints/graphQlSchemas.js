import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'


const messageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    body: {
      type: GraphQLString,
      description: 'message body'
    }
  }
})

const roomType = new GraphQLObjectType({
  name: 'Room',
  fields: {
    title: {
      type: GraphQLString,
      descripton: 'Room title'
    },
    messages: {
      type: new GraphQLList(messageType),
      description: 'list of messages',
      resolve: room => {
        return [{ body: 'hahaha' }]
      }
    }
  }
})

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    room: {
      type: roomType,
      resolve: () => ({ title: 'this room' })
    }
  }
})

const schemas = new GraphQLSchema({
  query: queryType
})

export default schemas
