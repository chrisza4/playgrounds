require('react-hot-loader/patch')

import $ from 'jquery'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactComponent from './reactModule'
import { executeWhenReady } from './jqueryModule1'
import { render } from './middleBeforeReact'

$(document).ready(() => {
  executeWhenReady()
})


render(ReactComponent)

if (module.hot) {
  module.hot.accept('./jqueryModule1', () => {
    executeWhenReady()
  })

  module.hot.accept('./middleBeforeReact', () => {
    render(ReactComponent)
  })
}
