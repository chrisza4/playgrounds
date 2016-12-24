import './index.css'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import connectSocket from './socketConnector'
import getStore from './store/createStore'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

connectSocket(getStore())
