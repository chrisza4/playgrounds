import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import connectSocket from './socketConnector'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

connectSocket()
