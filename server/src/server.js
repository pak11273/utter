// utility and config imports
import path from 'path'
import logger from '../dist/util/logger'
import error from '../dist/middleware/error'
import config from '../dist/config/index.js'
import pwd from '../dist/config/pwd.js'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import _ from 'lodash'
import express from 'express'
import err from './middleware/error.js'
import http from 'http'
const app = express()
const server = http.createServer(app)

// third party middleware
import middleware from '../dist/middleware/appMiddleware'
middleware(app)

// express middleware
app.use(express.static(path.join(__dirname, 'client/dist'))) //path is relative to this directory
app.use('/cdn', express.static('cdn'))

// Routers
mongoose.connection.on('connected', function() {
  const aclRoutes = require('../dist/acl/routes.js')
  const api = require('../dist/api')
  const auth = require('../dist/auth/routes.js')
  const admin = require('../dist/admin/adminRoutes.js')
  const mailRouter = require('../dist/mail/routes.js')

  // mounts
  // app.use('/acl', aclRoutes) // moved inside of the mongoose function in Routers section
  app.use('/acl', aclRoutes)
  app.use('/api', api)
  app.use('/admin', admin)
  app.use('/auth', auth)
  app.use('/mail', mailRouter)
})

// used for gzipping bundle.js
app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/javascript')
  next()
})

app.get('*.css', function(req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/css')
  next()
})

// seed the db with dummy data TODO: change the seeding before using this
// if (config.seed) {
//   require('./util/seed')
// }

// error handling middleware
app.use(err)

module.exports = server
