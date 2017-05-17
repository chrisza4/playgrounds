import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from 'jquery'
export const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('reactroot')
  )
}

jQuery('#jq').html('Jquery in reaszsct')
