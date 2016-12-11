import * as MessageService from './messageService'
import * as UserService from './userService'

import connect from '../db'

describe('Create message', () => {

  let testUser

  before(async () => {
    await connect()
    testUser = await UserService.createUser({ email: 'test@test.com' })
  })

  it('should validate if owner exists', (done) => {
    MessageService.createMessage({
      body: 'hello'
    }, 'user2')
    .then(result => {
      done('should failed')
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })
})
