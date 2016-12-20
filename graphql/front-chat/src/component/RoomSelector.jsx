import { MenuItem } from 'material-ui/Menu'
import React from 'react'
import Subheader from 'material-ui/Subheader'
import _ from 'lodash'
import { connect } from 'react-redux'

const RoomSelector = React.createClass({
  propTypes: {
    roomsMap: React.PropTypes.object,
  },

  renderRooms () {
    return _.map(this.props.roomsMap, room =>
      <MenuItem primaryText={room.title} key={`room_${room._id}`} />
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
}))(RoomSelector)
