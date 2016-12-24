import React from 'react'
import './ChatMessage.css'

const ChatMessage = React.createClass({
  propTypes: {
    username: React.PropTypes.string,
    body: React.PropTypes.string
  },

  render () {
    return (
      <div className='gc-chat-message'>
        <span className='gc-chat-message__username'>
          {this.props.username}
        </span> : {this.props.body}
      </div>
    )
  }
})

export default ChatMessage
