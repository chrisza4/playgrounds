import * as MessageEndpoints from './messageEndpoints'

import Sinon from 'sinon'
import assert from 'power-assert'

const stubPromise = (args, result) => {
  const func = Sinon.stub()
  return func.withArgs(args).returns(result)
}

describe('Messages endpoints', () => {
  it('should create message by email in message', async () => {
    const mockFindByEmail = stubPromise('t@t.com', { _id: 'user1' })
    const mockCreateMessage = Sinon.stub().returns(Promise.resolve({}))
    await MessageEndpoints.createMessageEndpoint({ body: 'asdf' }, {
      findByEmail: mockFindByEmail,
      createMessage: mockCreateMessage
    })
    assert.equal(mockCreateMessage.args[0][1], 'user1')
  })

  it('should publish changes event', async () => {
    const mockFindByEmail = stubPromise('t@t.com', { _id: 'user1' })
    const mockCreateMessage = Sinon.stub().returns(Promise.resolve({}))
    const publishChanges = Sinon.stub()
    await MessageEndpoints.createMessageEndpoint({ body: 'asdf', roomId: 'room1' }, {
      findByEmail: mockFindByEmail,
      createMessage: mockCreateMessage,
      publishChanges
    })
    assert(publishChanges.calledWith({
      type: 'message:changes',
      roomId: 'room1'
    }))
  })
})
