import React from 'react'
import logo from './logo.svg'
import './App.css'
import Loading from '../public/loading.svg'

import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

const store = createStore(combineReducers({
  routing: routerReducer
}))

const MainPage = React.createClass({

  propTypes: {
    currentRoute: React.PropTypes.string,
    children: React.PropTypes.node,
  },

  renderLink (path, content) {
    const linkClass = this.props.currentRoute === path ? 'link-active' : 'link-inactive'
    return (
      <Link to={path} className={linkClass}>{content}</Link>
    )
  },

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>

        </div>
        <p className="App-intro">
          {this.renderLink('link1', 'Go to link 1')}
          &nbsp;
          {this.renderLink('link2', 'Go to link 2')}
        </p>
        <hr />
        {this.props.children}
      </div>
    )
  }
})

const MainPageContainer = connect((state, ownProps) => {
  return {
    children: ownProps.children,
    currentRoute: state.routing.locationBeforeTransitions.pathname
  }
})(MainPage)


const Link1Page = () => <div> This is page in Link 1 </div>
const Link2Page = () => <div> This is page in Link 2 </div>

const history = syncHistoryWithStore(browserHistory, store)

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={MainPageContainer}>
            <Route path='link1' component={Link1Page} />
            <Route path='link2' component={Link2Page}/>
          </Route>
        </Router>
      </Provider>
    )
  }
})

export default App
