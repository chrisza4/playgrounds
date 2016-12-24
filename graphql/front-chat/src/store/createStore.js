import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import MessageReducer from '../Messages/reducers'
import RoomReducer from '../Rooms/reducers'
import thunk from 'redux-thunk'

let _store = null

export default function getStore () {
  if (_store) return _store
  const reducers = combineReducers({
    messages: MessageReducer,
    rooms: RoomReducer,
  })
  _store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  return _store
}
