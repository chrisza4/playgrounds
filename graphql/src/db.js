import Mongoose from 'mongoose'
import config from './config'
import DatabaseCleaner from 'database-cleaner'
import Log from 'winston'

let _db = null

export default async function connect () {
  try {
    if (_db) {
      return _db
    }
    Mongoose.promise = require('bluebird')
    const connection = await Mongoose.connect(config.MONGO_URL, {
      promiseLibrary: require('bluebird')
    })
    _db = connection
    if (process.env.NODE_ENV === 'test') {
      await cleanDb()
    }
    return _db
  } catch (err) {
    console.log(err)
  }
}

function cleanDb () {
  return new Promise((resolve, reject) => {
    const cleaner = new DatabaseCleaner('mongodb')
    cleaner.clean(Mongoose.connections[0].db, (err, res) => {
      if (err) {
        Log.error(err)
        reject(err)
        return
      }
      resolve()
    })
  })
}
