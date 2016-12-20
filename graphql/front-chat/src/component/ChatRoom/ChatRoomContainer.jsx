import './ChatRoomContainer.css'

import ChatMessage from './ChatMessage'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchRoom } from '../../Rooms/actions.js'
import { fetchStarter } from '../../store/AppActions.js'

const ChatRoomContainer = React.createClass({

  propTypes: {
    messages: React.PropTypes.array,
    isFetched: React.PropTypes.bool,
    onFetchStarter: React.PropTypes.func,
    onFetchRoom: React.PropTypes.func
  },

  componentDidMount () {
    if (!this.props.isFetched) {
      this.props.onFetchStarter()
    }
  },

  renderMessages () {
    return _.map(this.props.messages, m => (
      <ChatMessage username='hello' body={m.body} key={`message_${m._id}`} />
    ))
  },

  render () {
    return (
      <div style={{height: '100%'}}>
        <div className='gc-chat-room-container' style={{height: '100%'}}>
          {this.renderMessages()}
          <div className='gc-chat-text'>
            <FlatButton label='click' primary onClick={() => this.props.onFetchRoom('584e8e4c8957b62a77d71cad')} />
            <TextField hintText='Enter your message here..' />
          </div>
        </div>
      </div>
    )
  }
})

const messagesSelector = (state) => {
  const currentRoomId = state.rooms.selectedRoom
  if (!currentRoomId) return [ ]
  const messages = _.get(state, 'messages.data', [ ])
  return _.filter(messages, d => d.roomId === currentRoomId)
}

export default connect(
  (state, props) => ({
    messages: messagesSelector(state)
  }),
  (dispatch) => {
    return {
      onFetchStarter: () => dispatch(fetchStarter()),
      onFetchRoom: (roomId) => dispatch(fetchRoom(roomId))
    }
  }
)(ChatRoomContainer)
