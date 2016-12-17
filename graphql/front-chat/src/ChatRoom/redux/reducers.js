import _ from 'lodash'
import { combineReducers } from 'redux'
import createMessageFixtures from '../../Fixtures/MessageFixtures'

const initialState = createMessageFixtures()

export function MessageReducer(state = initialState, action) {
  switch (action.type) {
    case 'STARTER': {
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
