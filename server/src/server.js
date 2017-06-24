import config from './config/config'
import express from 'express'
import middleware from './middleware/appMiddleware'
import api from './api'
import logger from './util/logger'
import error from './middleware/error'
import auth from './auth/routes.js'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
// import cors from 'cors';
mongoose.Promise = bluebird

mongoose.connect(config.db.url)
const app = express()

if (config.seed) {
  require('./util/seed')
}

// middleware
middleware(app)

// cors preflight
// alternative cors code
// app.use(function(req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
// });

// cors preflight using npm cors
// app.use(cors());
// app.options("*", cors());

// api
// *if using cors, add as 1st middleware func
app.use('/api', api)
app.use('/auth', auth)

// temporary url

// todo: global error handling
app.use(error())

// export
module.exports = app
