import merge from 'lodash/merge'

// if env not set, set it to default
if (!process.env.NODE_ENV) {
  ;(process.env.NODE_ENV = process.env.NODE_ENV) ||
    (process.env.NODE_ENV = 'development')
}

// default config object
// export default {
const baseConfig = {
  port: process.env.PORT || 3001,
  expireTime: 24 * 60 * 10, // 10 days expiration
  // TODO: move this to ./secrets file
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  db: {
    url: 'mongodb://localhost:27017/utter-dev'
  }
}

// set config env to node_env
baseConfig.env = process.env.NODE_ENV

var envConfig

try {
  envConfig = require('./' + baseConfig.env).default
  envConfig = envConfig || {}
} catch (e) {
  envConfig = {}
}

// merge the two objects and export it so our app can use it
export default merge(baseConfig, envConfig || {})
