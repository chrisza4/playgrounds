/// <reference path="../../../../typings/index.d.ts" />

import * as buffer from 'buffer'
import * as crypto from 'crypto'

interface hashPassword {
  hashed: string
  salt: string
}

export function createHashPassword (originalPassword: string, salt: string): string {
  const buffer = crypto.pbkdf2Sync(originalPassword, salt, 100, 512, 'sha512')
  return buffer.toString('base64')
}

export function verify (hash: string, password: string, salt: string): boolean {
  const expected = createHashPassword(password, salt)
  return expected === hash
}

export function createRandomSalt () {
  return crypto.randomBytes(256).toString('base64')
}