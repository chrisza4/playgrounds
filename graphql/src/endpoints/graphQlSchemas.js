import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

import * as MessageService from '../services/messageService'
import * as RoomService from '../services/roomService'


const messageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    _id: {
      type: GraphQLString,
      descripton: 'message id'
    },
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
        return MessageService.getMessageByRoomId(String(room._id))
      }
    }
  }
})

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    rooms: {
      type: new GraphQLList(roomType),
      resolve: async () => {
        const rooms = await RoomService.getAllRooms()
        return rooms
      }
    },
    messages: {
      type: new GraphQLList(messageType),
      args: {
        roomId: { type: GraphQLString }
      },
      resolve: async (_, { roomId }) => {
        return MessageService.getMessageByRoomId(roomId)
      }
    }
  }
})

const schemas = new GraphQLSchema({
  query: queryType
})

export default schemas
