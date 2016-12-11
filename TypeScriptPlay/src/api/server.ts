/// <reference path="../../typings/index.d.ts" />

import * as express from 'express'
import * as mongoose from 'mongoose'
import { setup as setupDb } from './db'
import initDb from './user/init'
import { setupEndpoint, setupAuth } from './user/endpoint'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import { Strategy } from 'passport-local'
import * as cors from 'cors'

const PORT = 3001

setupDb()

// Create a new Express application.
const app = express()
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.

app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(session({ secret: 'my my my', resave: false, saveUninitialized: false }))

setupAuth(app)
setupEndpoint(app)

app.listen(PORT)

console.log('#### API Server listen at port ', PORT)