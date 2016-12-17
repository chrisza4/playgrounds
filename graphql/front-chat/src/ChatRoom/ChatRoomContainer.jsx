import React from 'react'
import ChatMessage from './ChatMessage'
import './ChatRoomContainer.css'

import createMessageFixtures from '../Fixtures/MessageFixtures'
import TextField from 'material-ui/TextField'

const ChatRoomContainer = React.createClass({

  propTypes: {
    messages: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      messages: createMessageFixtures()
    }
  },

  renderMessages () {
    return this.props.messages.map(m => (
      <ChatMessage username='hello' body={m.body} />
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

export default ChatRoomContainer
