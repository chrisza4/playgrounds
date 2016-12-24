import Actions from '../store/Actions'
import _ from 'lodash'
import { combineReducers } from 'redux'

const initialState = [ ]

export function MessageReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_STARTER: {
      const messagesArray = _.reduce(action.data.rooms, (acc, val) => {
        const roomId = val._id
        const messages = _.map(val.messages, m => {
          return {
            roomId,
            ownerId: null,
            ...m
          }
        })
        return [ ...acc, ...messages]
      }, [ ])
      return _.keyBy(messagesArray, t => t._id)
    }
    case Actions.MESSAGE_CREATED: {
      return {
        ...state,
        [action.data._id]: {
          ...action.data,
          roomId: action.roomId
        }
      }
    }
    case Actions.FETCH_ROOM: {
      const messageWithRoom = action.data.map(d => ({ ...d, roomId: action.roomId }))
      const newData = _.keyBy(messageWithRoom, t => t._id)
      return Object.assign({ }, state, newData)
    }
    default:
      return state
  }
}

function MessageUiReducer (state = { fetched: false }, action) {
  return state
}

export default combineReducers({
  data: MessageReducer,
  uiState: MessageUiReducer
})
