import Actions from '../store/actions'
import AuthReducer from './reducers'
import assert from 'power-assert'

describe('Auth reducer', () => {
  it('should store authentication token', () => {
    const result = AuthReducer({ }, {
      type: Actions.AUTH_TOKEN_RECIEVED,
      token: 'someToken'
    })
    assert.equal(result.token, 'someToken')
  })

  it('should be able to log out', () => {
    const state = {
      token: 'someToken'
    }
    const result = AuthReducer(state, {
      type: Actions.AUTH_LOGOUT
    })
    expect(result.token).toBe(null)
  })
})
