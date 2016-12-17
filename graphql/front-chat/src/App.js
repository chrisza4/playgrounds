import React, { Component } from 'react'
import logo from './logo.svg'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import Subheader from 'material-ui/Subheader'
import {Menu, MenuItem} from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDrawer: true
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
      <MuiThemeProvider>
        <div>
          <AppBar title='Chat here' onLeftIconButtonTouchTap={this.toggleDrawer} />
          <Drawer open={this.state.openDrawer} docked={true} onRequestChange={(e) => console.debug('====')}>
            <Subheader> Chat users </Subheader>
            <MenuItem primaryText='Room1' />
            <MenuItem primaryText='Room2' />
            <Divider />
            <MenuItem primaryText='Room3' />
          </Drawer>
          <div className='gc-main-layout' onClick={this.toggleDrawer}>
            Main layout here
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
