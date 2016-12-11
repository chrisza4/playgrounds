const config = {
  name: 'Test',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1/type_dev'
}

const testConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/type_test',
  MONGO_USER: null,
  MONGO_PASS: null,
}

if (process.env.NODE_ENV === 'test') {
  Object.assign(config, testConfig)
}

export default config