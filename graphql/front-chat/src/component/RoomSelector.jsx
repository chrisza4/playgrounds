import * as RoomActions from '../Rooms/actions.js'

import { MenuItem } from 'material-ui/Menu'
import React from 'react'
import Subheader from 'material-ui/Subheader'
import _ from 'lodash'
import { connect } from 'react-redux'

const RoomSelector = React.createClass({
  propTypes: {
    roomsMap: React.PropTypes.object,
    onRoomChange: React.PropTypes.func,
    onToggleDrawer: React.PropTypes.func,
  },

  onRoomChange (roomId) {
    this.props.onRoomChange(roomId)
    this.props.onToggleDrawer()
  },

  renderRooms () {
    return _.map(this.props.roomsMap, room =>
      <MenuItem primaryText={room.title} key={`room_${room._id}`} onClick={() => this.onRoomChange(room._id)} />
    )
  },

  render () {
    return (
      <div>
        <Subheader> Chat users </Subheader>
        {this.renderRooms()}
      </div>
    )
  }
})

export default connect((state, ownProps) => ({
  roomsMap: state.rooms.data,
  selectedRoom: state.rooms.selectedRoom
}), (dispatch) => ({
  onRoomChange: (roomId) => dispatch(RoomActions.changeRoom(roomId))
}))(RoomSelector)
