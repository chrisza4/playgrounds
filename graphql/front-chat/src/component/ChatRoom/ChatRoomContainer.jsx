import './ChatRoomContainer.css'

import * as MessageActions from '../../Messages/actions.js'

import ChatMessage from './ChatMessage'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import { connect } from 'react-redux'
import { doAuth } from '../../Auth/actions.js'
import { fetchRoom } from '../../Rooms/actions.js'
import { fetchStarter } from '../../store/AppActions.js'

const ChatRoomContainer = React.createClass({

  propTypes: {
    messages: React.PropTypes.array,
    currentRoomId: React.PropTypes.string,
    isFetched: React.PropTypes.bool,
    onFetchStarter: React.PropTypes.func,
    onFetchRoom: React.PropTypes.func,
    onAuth: React.PropTypes.func,
  },

  getInitialState () {
    return {
      textValue: ''
    }
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

  onMessageCreated () {
    this.props.onMessageCreated(this.state.textValue, this.props.currentRoomId)
    this.setState({ textValue: '' })
  },

  onTextChange (e) {
    this.setState({ textValue: e.target.value })
  },

  onTextKeyDown (e) {
    if (e.keyCode === 13) {
      this.onMessageCreated()
    }
  },

  render () {
    return (
      <div style={{height: '100%'}}>
        <div className='gc-chat-room-container' style={{height: '100%'}}>
          {this.renderMessages()}
          <div className='gc-chat-text'>
            <TextField
              hintText='Enter your message here..'
              value={this.state.textValue}
              onChange={this.onTextChange}
              onKeyDown={this.onTextKeyDown}
            />
            <FlatButton label='Send' primary onClick={this.onMessageCreated} />
            <FlatButton label='Fetch' primary onClick={() => this.onMessageCreated} />
            <FlatButton label='Auth' primary onClick={() => this.props.onAuth('testmail@testmail.com')} />
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
    messages: messagesSelector(state),
    currentRoomId: state.rooms.selectedRoom
  }),
  (dispatch) => {
    return {
      onFetchStarter: () => dispatch(fetchStarter()),
      onFetchRoom: (roomId) => dispatch(fetchRoom(roomId)),
      onMessageCreated: (...args) => dispatch(MessageActions.createMessage(...args)),
      onAuth: (email) => dispatch(doAuth(email))
    }
  }
)(ChatRoomContainer)
