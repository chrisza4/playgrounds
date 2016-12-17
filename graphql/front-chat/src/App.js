import React, { Component } from 'react'
import logo from './logo.svg'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'
import { MenuItem } from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import { Provider } from 'react-redux'

import ChatRoomContainer from './ChatRoom/ChatRoomContainer.jsx'
import './App.css'
import getStore from './store/createStore'


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

  renderIconButton () {
    return (
      <IconButton iconClassName='material-icons' onClick={this.toggleDrawer}>reorder</IconButton>
    )
  }

  render () {
    return (
      <Provider store={getStore()}>
        <MuiThemeProvider>
          <div>
            <AppBar
              title='Room1'
              onLeftIconButtonTouchTap={this.toggleDrawer}
              onRightIconButtonTouchTap={this.toggleDrawer}
              iconElementLeft={this.renderIconButton()}
            />
            <Drawer open={this.state.openDrawer} docked={true} onRequestChange={(e) => console.debug('====')}>
              <Subheader> Chat users </Subheader>
              <MenuItem primaryText='Room1' />
              <MenuItem primaryText='Room2' />
              <Divider />
              <MenuItem primaryText='Room3' />
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

export default App
