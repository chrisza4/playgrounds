import React from 'react'
import ChatMessage from './ChatMessage'

import createMessageFixtures from '../Fixtures/MessageFixtures'

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
    return this.props.messages.map(m => <ChatMessage username='hello' body={m.body} />)
  },

  render () {
    return (
      <div>
        {this.renderMessages()}
      </div>
    )
  }
})

export default ChatRoomContainer
