import _ from 'lodash'
import pwd from './pwd.js'

// default config object
// export default {
const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3001,
  expireTime: 24 * 60 * 10, // 10 days expiration
  // TODO: move this to ./secrets file
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  secrets: {
    jwt: process.env.JWT || 'gumball',
    facebook: {
      clientID: '218390765395433',
      clientSecret: '621df9fb56685485b52033ac147bef73',
      profileField: ['email', 'displayName', 'photos'],
      callbackUrl: 'http://192.168.68.8:3030/auth/facebook/callback',
      passReqToCallback: true
    },
    google: {
      clientID:
        '598278254339-2fdd4dfnr8gte0jm4a5p7f3s9p9jpprb.apps.googleusercontent.com',
      clientSecret: 'WOVF7nS1hMOaIg5APkEssVZW'
    }
  }
}

// if env not set, set it to default
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = process.env.NODE_ENV || config.dev
}

// set config env to node_env
config.env = process.env.NODE_ENV

var envConfig

try {
  envConfig = require('./' + config.env).default
  envConfig = envConfig || {}
} catch (e) {
  envConfig = {}
}

// merge the two objects and export it so our app can use it
export default _.merge(config, envConfig || {})
