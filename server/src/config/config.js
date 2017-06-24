import _ from 'lodash';

// default config object
const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 10, // 10 days expiration
  secrets: {
    jwt: process.env.JWT || 'gumball'// remove this in production
  }
};

// if env not set, set it to default
process.env.NODE_ENV= process.env.node_env || config.dev;

// set config env to node_env 
config.env = process.env.NODE_ENV;

var envConfig;

try {
  envConfig = require('./' + config.env); 
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge the two objects and export it so our app can use it
module.exports = _.merge(config, envConfig || {});
