/// <reference path="../../../../typings/index.d.ts" />
import * as PasswordTools from './passwordTools'
import { expect } from 'chai' 

describe('Password tools', () => {
  it('should be able to hash and verify', () => {
    const salt = 'byWXX8BivmcQK4pUf0/qTg=='
    const hashPass = PasswordTools.createHashPassword('1234', salt)
    expect(PasswordTools.verify(hashPass, '1234', salt)).to.be.true
    expect(PasswordTools.verify(hashPass, '5678', salt)).to.be.false
    expect(PasswordTools.verify(hashPass, '1233', salt)).to.be.false
  })
})