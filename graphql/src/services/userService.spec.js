import Sinon from 'sinon'
import * as UserService from './userService'
import assert from 'power-assert'

describe('User service', () => {
  describe('Auth for token', () => {
    it('should validate input to be string', (done) => {
      UserService.authForToken(null).then(() => {
        done('should validate payload for not null')
      })
      .catch(() => done())
    })

    it('should create new user if not exists with new webtoken and return user token', async () => {
      const mockCreateUser = Sinon.stub().returns(Promise.resolve({ }))
      const mockGetUser = async () => null
      const mockGetWebToken = () => 'token'
      const token = await UserService.authForToken('new@new.com', {
        createUser: mockCreateUser,
        findByEmail: mockGetUser,
        sign: mockGetWebToken
      })
      assert(mockCreateUser.called)
      assert(mockCreateUser.calledWith({
        email: 'new@new.com',
        accessToken: 'token'
      }))
      assert.equal(token, 'token')
    })

    it('should return old user with current token if user have token', async () => {
      const mockGetUser = async () => ({
        accessToken: 'old_access_token'
      })
      const token = await UserService.authForToken('new@new.com', {
        findByEmail: mockGetUser
      })
      assert.equal(token, 'old_access_token')
    })

    it('if user do not already have web token, it should update user and return new token', async () => {
      const mockGetUser = async () => ({
        email: 'new@new.com',
        accessToken: null
      })
      const mockGetToken = () => 'new_access'
      const mockUpdateUser = Sinon.stub().returns(Promise.resolve({ }))
      await UserService.authForToken('new@new.com', {
        findByEmail: mockGetUser,
        sign: mockGetToken,
        findByEmailAndUpdate: mockUpdateUser
      })
      assert(mockUpdateUser.calledWith('new@new.com', {
        accessToken: 'new_access'
      }))
    })
  })
})
