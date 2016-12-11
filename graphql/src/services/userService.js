import UserModel from '../models/userModel'

export function createUser (user) {
  return UserModel.create(user)
}
