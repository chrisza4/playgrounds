import * as MessageActions from './actions'

import Actions from '../store/Actions'
import Sinon from 'sinon'
import assert from 'power-assert'

describe('Message actions: create message', () => {
  it('should create message actions correctly', async () => {
    const mockPost = async () => ({
      data: {
        data: {
          createMessage: {
            _id: 'id1',
            body: 'chat chat chat'
          }
        }
      }
    })
    const mockDispatch = Sinon.stub()
    await MessageActions.createMessage('chat chat chat', 'id1', { post: mockPost })(mockDispatch)
    const createdAction = mockDispatch.args[0][0]
    assert.deepEqual(createdAction, {
      type: Actions.MESSAGE_CREATED,
      data: {
        _id: 'id1',
        body: 'chat chat chat',
      },
      roomId: 'id1'
    })
  })
})
