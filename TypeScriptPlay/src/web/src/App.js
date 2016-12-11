import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import Welcome from './Welcome'
import LoginPage from './Login/login'
import MainPage from './Main/main'

const Layout = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render () {
    return <div>{this.props.children}</div>
  }
})

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRedirect to='/welcome' />
          <Route path='/login' component={LoginPage} />
          <Route path='/welcome' component={Welcome} />
          <Route path='/mainpage' component={MainPage} />
        </Route>
      </Router>
    )
  }
}

export default App
