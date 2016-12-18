import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

import * as MessageService from '../services/messageService'
import * as RoomService from '../services/roomService'
import * as UserService from '../services/userService'


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
    _id: {
      type: GraphQLString,
      description: 'Room Id'
    },
    title: {
      type: GraphQLString,
      description: 'Room title'
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

const userType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    _id: {
      type: GraphQLString,
      description: 'User Id'
    },
    email: {
      type: GraphQLString,
      description: 'User email'
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
    },
    users: {
      type: new GraphQLList(userType),
      resolve: () => {
        return UserService.findAll()
      }
    }
  }
})

const schemas = new GraphQLSchema({
  query: queryType
})

export default schemas
