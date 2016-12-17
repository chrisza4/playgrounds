import './ChatRoomContainer.css'

import * as ChatActions from './redux/actions.js'

import ChatMessage from './ChatMessage'
import React from 'react'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import { connect } from 'react-redux'

const ChatRoomContainer = React.createClass({

  propTypes: {
    messages: React.PropTypes.array,
    isFetched: React.PropTypes.bool,
  },

  componentDidMount () {
    if (!this.props.isFetched) {
      ChatActions.fetchMessage()
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
            <TextField hintText='Enter your message here..' />
          </div>
        </div>
      </div>
    )
  }
})

export default connect(
  (state, props) => ({
    messages: state.message
  })
)(ChatRoomContainer)
