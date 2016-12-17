import React from 'react'

const ChatMessage = React.createClass({
  propTypes: {
    username: React.PropTypes.string,
    body: React.PropTypes.string
  },

  render () {
    return (
      <div>
        {this.props.username} : {this.props.body}
      </div>
    )
  }
})

export default ChatMessage
