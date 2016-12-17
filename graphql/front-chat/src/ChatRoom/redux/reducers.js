import { combineReducers } from 'redux'
import createMessageFixtures from '../../Fixtures/MessageFixtures'

const initialState = createMessageFixtures()

function MessageReducer(state = initialState, action) {
  switch (action.type) {
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
