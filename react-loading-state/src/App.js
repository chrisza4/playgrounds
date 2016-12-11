import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Loading from '../public/loading.svg'

import { Router, Route, Link, browserHistory } from 'react-router'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import LoadingReducer from './loadingReducer'

const store = createStore(LoadingReducer)

const LoadingPage = React.createClass({

  propTypes: {
    isLoaded: React.PropTypes.bool,
    stringToRender: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },

  componentDidMount() {
    if (!this.props.isLoaded) {
      // Mimic lodaing data here
      setTimeout(() => this.props.dispatch({ type: 'LOAD_DATA' }), 2000)
    }
  },

  renderLoadingState () {
    if (this.props.isLoaded) return null
    return <img src={Loading} />
  },

  renderLoadedData () {
    if (!this.props.isLoaded) return null
    return <b>Data loaded: {this.props.stringToRender}</b>
  },

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.renderLoadingState()}
          {this.renderLoadedData()}
        </p>
      </div>
    )
  }
})

const LoadingPageContainer = connect((state) => ({
  isLoaded: state.isLoaded,
  stringToRender: state.stringToRender
}))(LoadingPage)

const PageWithStore = props => (
  <Provider store={store}>
    <LoadingPageContainer />
  </Provider>
)

const App = React.createClass({
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={PageWithStore} />
      </Router>
    )
  }
})

export default App
