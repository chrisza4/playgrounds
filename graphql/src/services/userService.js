import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel'
import T from 'tcomb'
import Config from '../config'

export function createUser (user) {
  return UserModel.create(user)
}

export function findById (userId) {
  return UserModel.findOne({
    _id: userId
  }).lean()
}

export function findByEmail (email) {
  return UserModel.findOne({
    email
  }).lean()
}

export function findAll () {
  return UserModel.find({}).lean()
}

function findByEmailAndUpdate (email, updates) {
  return UserModel.findOneAndUpdate({
    email
  }, {
    $set: updates
  }, { new: true })
}

function getWebTokenByEmail (email, sign = jwt.sign) {
  const tokenPayload = {
    email
  }
  return sign(tokenPayload, Config.SECRET)
}

export async function authForToken (email, deps) {
  T.String(email)
  deps = Object.assign({
    createUser,
    findByEmail,
    sign: jwt.sign,
    findByEmailAndUpdate
  }, deps)
  let user = await deps.findByEmail(email)
  if (!user) {
    const webToken = getWebTokenByEmail(email, deps.sign)
    await deps.createUser({
      email,
      accessToken: webToken
    })
    return webToken
  }
  if (user.accessToken) return user.accessToken
  const webToken = getWebTokenByEmail(email, deps.sign)
  await deps.findByEmailAndUpdate(email, { accessToken: webToken })
  return webToken
}
