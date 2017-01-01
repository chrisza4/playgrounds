import * as AuthActions from './actions'

import Actions from '../store/Actions'
import Sinon from 'sinon'

describe('Auth Actions', () => {
  let mockPost, dispatch, mockAuthSocket, mockDeps, sandbox
  beforeEach(() => {
    sandbox = Sinon.sandbox.create()
    mockPost = sandbox.stub().returns(Promise.resolve({
      data: {
        data: {
          authForToken: 'someWeirdToken'
        }
      }
    }))
    dispatch = sandbox.stub()
    mockAuthSocket = sandbox.stub()
    mockDeps = { post: mockPost, authenticateSocket: mockAuthSocket }
  })
  afterEach(() => {
    sandbox.restore()
  })


  it('Should get token from server', async () => {
    await AuthActions.doAuth('someMail', mockDeps)(dispatch)
    expect(mockPost.calledWith('http://localhost:4000/api/graphql')).toBe(true)
    expect(dispatch.calledWith({
      type: Actions.AUTH_TOKEN_RECIEVED,
      token: 'someWeirdToken'
    })).toEqual(true)
  })

  it('should auth token to socket', async () => {
    await AuthActions.doAuth('someMail', mockDeps)(dispatch)
    expect(mockAuthSocket.calledWith('someWeirdToken')).toBe(true)
  })
})
