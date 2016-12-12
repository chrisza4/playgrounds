import connect from './db'
import Log from 'winston'
import createExpressServer from './endpoints/server'

async function initServer () {
  await connect()
  createExpressServer()
}

initServer()
.then(d => Log.info('Init completed'))
.catch(err => {
  Log.error('Critical error:', err)
})
