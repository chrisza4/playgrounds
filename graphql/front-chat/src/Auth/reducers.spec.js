import AuthReducer from './reducers'
import Actions from '../store/actions'
import assert from 'power-assert'

describe('Auth reducer', () => {
  it('should store authentication token', () => {
    const result = AuthReducer({ }, {
      type: Actions.AUTH_TOKEN_RECIEVED,
      token: 'someToken'
    })
    assert.equal(result.token, 'someToken')
  })
})
