require('react-hot-loader/patch')

import $ from 'jquery'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactComponent from './reactModule'
import ReactDOM from 'react-dom'
import { executeWhenReady } from './jqueryModule1'

$(document).ready(() => {
  executeWhenReady()
})

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('reactroot')
  )
}

render(ReactComponent)

if (module.hot) {
  module.hot.accept('./jqueryModule1', () => {
    executeWhenReady()
  })

  module.hot.accept('./reactModule', () => {
    render(ReactComponent)
  })
}
