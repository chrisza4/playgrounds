import UserModel from './model/model'
import * as PasswordTools from './model/passwordTools'

export default async function init () {
  const userEmail  = 'chakrit.lj@gmail.com'
  const password = 'aaaa'
  const user = new UserModel()
  const salt = PasswordTools.createRandomSalt()
  return UserModel.findOneAndUpdate({
    email: userEmail
  }, {
    email: userEmail,
    salt,
    password: PasswordTools.createHashPassword(password, salt)
  }, {
    upsert: true
  })
}