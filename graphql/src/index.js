import connect from './db'
import Log from 'winston'

async function initServer () {
  await connect()
}

initServer()
.then(d => Log.info('Init completed'))
.catch(err => {
  Log.error('Critical error:', err)
})
