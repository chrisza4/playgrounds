import { createStore, combineReducers } from 'redux'
import MessageReducer from '../ChatRoom/redux/reducers'

export default function getStore () {
  const reducers = combineReducers({
    messages: MessageReducer
  })
  return createStore(reducers)
}
