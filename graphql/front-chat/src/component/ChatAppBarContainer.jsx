import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const ChatAppBar = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    onToggleDrawer: React.PropTypes.func,
  },

  getDefaultProps () {
    return {
      onToggleDrawer: _.noop,
      title: 'No title'
    }
  },

  renderIconButton () {
    return (
      <IconButton iconClassName='material-icons' onClick={this.props.onToggleDrawer}>reorder</IconButton>
    )
  },

  render () {
    return (
      <AppBar
        title={this.props.title}
        onLeftIconButtonTouchTap={this.props.toggleDrawer}
        onRightIconButtonTouchTap={this.props.toggleDrawer}
        iconElementLeft={this.renderIconButton()}
      />
    )
  }
})

const currentRoomTitleSelector = state => state.rooms.selectedRoom ? state.rooms.data[state.rooms.selectedRoom].title : 'No title'

export default connect((state) => {
  return {
    title: currentRoomTitleSelector(state)
  }
})(ChatAppBar)
