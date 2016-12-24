import Mongoose from 'mongoose'
import config from './config'
import DatabaseCleaner from 'database-cleaner'
import Log from 'winston'

let connected = false

export default async function connect () {
  try {
    if (connected) {
      await cleanDbForTestEnvironment()
      return
    }
    Mongoose.Promise = require('bluebird')
    await Mongoose.connect(config.MONGO_URL, {
      promiseLibrary: require('bluebird')
    })
    connected = true
    await cleanDbForTestEnvironment()
    return
  } catch (err) {
    console.log(err)
  }
}

function cleanDbForTestEnvironment () {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const cleaner = new DatabaseCleaner('mongodb')
      cleaner.clean(Mongoose.connections[0].db, (err, res) => {
        if (err) {
          Log.error(err)
          reject(err)
          return
        }
        resolve()
      })
    } else {
      resolve()
    }
  })
}
