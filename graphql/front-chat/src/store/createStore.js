import { combineReducers, createStore } from 'redux'

import MessageReducer from '../ChatRoom/redux/reducers'

export default function getStore () {
  const reducers = combineReducers({
    messages: MessageReducer
  })
  return createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}
