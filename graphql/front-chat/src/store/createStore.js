import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import MessageReducer from '../Messages/reducers'
import thunk from 'redux-thunk'

export default function getStore () {
  const reducers = combineReducers({
    messages: MessageReducer
  })
  return createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
}
