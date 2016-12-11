/// <reference path="../../typings/index.d.ts" />

import * as mongoose from 'mongoose'
import Config from './config/main'

export async function setup () {
  return mongoose.connect(Config.MONGO_URL).then(async () => {
    console.log(`Connected to mongoose at ${Config.MONGO_URL}`)
    if (process.env.NODE_ENV === 'test') {
      await clearAllCollections(mongoose.connection)
    }
  })
}

async function clearAllCollections(conn: mongoose.Connection) {
  for (const i in conn.collections) {
    const collection = mongoose.connection.collections[i]
    await collection.remove({ })
  }
}