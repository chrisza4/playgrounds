import * as MessageEndpoints from './messageEndpoints'
import * as MessageService from '../services/messageService'
import * as RoomService from '../services/roomService'
import * as UserService from '../services/userService'

import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import { publishChanges } from './event'

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
    },
    ownerId: {
      type: GraphQLString,
      description: 'owner'
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

const messageInput = new GraphQLInputObjectType({
  name: 'messageInput',
  fields: {
    body: { type: GraphQLString },
    roomId: { type: GraphQLString },
    email: { type: GraphQLString }
  }
})

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMessage: {
      type: messageType,
      args: {
        message: { type: messageInput }
      },
      resolve: async (root, { message }) => {
        return MessageEndpoints.createMessageEndpoint(message)
      }
    }
  }
})

export const schemas = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

export default schemas
