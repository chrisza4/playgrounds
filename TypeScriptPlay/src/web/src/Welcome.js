import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from './logo.svg'
import './Welcome.css'

class Welcome extends Component {

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={'/login'}>To login page</Link>
        {this.props.children}
      </div>
    )
  }
}

Welcome.propTypes = {
  children: React.PropTypes.node
}

export default Welcome
