import DotEnv from 'dotenv'

DotEnv.config({ silent: false })

const config = {
  MONGO_URL: process.env['MONGO_URL'] || 'mongodb://localhost:27017/graphql_chat'
}

if (process.env.NODE_ENV === 'test') {
  Object.assign(config, {
    MONGO_URL: 'mongodb://localhost:27017/graphql_chat_test'
  })
}

export default config
