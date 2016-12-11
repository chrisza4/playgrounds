/// <reference path="../../../typings/index.d.ts" />
import * as Express from 'express'
import * as _ from 'lodash'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import * as bodyParser from 'body-parser'

import UserModel, { User } from './model/model'
import { verify } from './model/passwordTools'

export function setupEndpoint (app: Express.Express) {

  app.get('/currentuser', async (req, res) => {
    const users = await UserModel.find({ }).lean() as Array<User>
    res.send(JSON.stringify(users))
  })

  app.get('/haha', (req, res) => {
    res.send('HAHAHAHAHAHHA. You sucks!!!')
  })

  app.get('/cool', (req, res) => {
    res.send('you cool!!')
  })

  app.get('/session', (req, res) => {
    res.send('session:' + JSON.stringify(req.user))
  })

  app.post('/login', async (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      res.json({
        success: true
      })
    })
    const user = await UserModel.findOne({ email: req.body.username })
    if (!user) {
      res.json({
        success: false
      })
      return
    }
    if (!verify(user.password, req.body.password, user.salt)) {
      res.json({
        success: false
      })
      return
    }
    req.logIn(user, (err) => {
      if (err) return err
      res.json({
        success: true
      })
    })
  })
}

export function setupAuth (app: Express.Express) {
  const authStrategy = new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({ email: username })
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    if (!verify(user.password, password, user.salt)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user)
  })

  passport.use(authStrategy)

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (userId, done) => {
    const user = await UserModel.findOne({ _id: userId })
    done(null, user)
  })
  app.use(passport.initialize())
  app.use(passport.session())
}