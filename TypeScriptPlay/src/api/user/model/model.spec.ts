/// <reference path="../../../../typings/index.d.ts" />

import { expect } from 'chai'
import UserModel from './model';
import { setup } from '../../db'


describe('User Model Test:', () => {
  before(() => { 
    return setup()
  })

  it('should be able to save and read from database', async () => {
    const newUser = new UserModel()
    newUser.email = 'asdf'
    newUser.password = 'asdf'
    await newUser.save()
    const user = await UserModel.findOne({ email: 'asdf'})
    expect(user.password).to.equal('asdf')
  })

  it('should be able to modify data in database', async () => {
    await UserModel.findOneAndUpdate({ email: 'asdf' }, { $set: { password: 'new' }})
    const user = await UserModel.findOne({ email: 'asdf'})
    expect(user.password).to.equal('new')
  })
})