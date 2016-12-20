import './App.css'

import React, { Component } from 'react'

import ChatAppBarContainer from './component/ChatAppBarContainer.jsx'
import ChatRoomContainer from './component/ChatRoom/ChatRoomContainer.jsx'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import RoomSelector from './component/RoomSelector.jsx'
import getStore from './store/createStore'
import logo from './logo.svg'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDrawer: false
    }
  }

  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer })
  }

  renderOld () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }

  render () {
    return (
      <Provider store={getStore()}>
        <MuiThemeProvider>
          <div>
            <ChatAppBarContainer onToggleDrawer={this.toggleDrawer} />
            <Drawer open={this.state.openDrawer} docked={true} onRequestChange={(e) => console.debug('====')}>
              <RoomSelector onToggleDrawer={this.toggleDrawer} />
            </Drawer>
            <div className='gc-main-layout'>
              <ChatRoomContainer />
            </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

App.propTypes = {
  onFetchStarter: React.PropTypes.func
}

export default App
