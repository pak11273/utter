// utility and config imports
import path from 'path'
import logger from '../dist/util/logger'
import error from '../dist/middleware/error'
import config from '../dist/config/config.js'
import pwd from '../dist/config/pwd.js'
import nodemailer from 'nodemailer'
import _ from 'lodash'
import express from 'express'
import err from './middleware/error.js'
const app = express()

// third party middleware
import middleware from '../dist/middleware/appMiddleware'
middleware(app)

// express middleware
app.use(express.static(path.join(__dirname, '/../../client/dist')))

// Routers
import api from '../dist/api'
import auth from '../dist/auth/routes.js'
import mailRouter from '../dist/util/mail.js'
import lionRouter from '../dist/lions.js'
import tigerRouter from '../dist/tigers.js'

// mounts
app.use('/api', api)
app.use('/auth', auth)
app.use('/lions', lionRouter)
app.use('/tigers', tigerRouter)
app.use('/sendmail', mailRouter)

// app route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), function(
    err
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// error handling middleware
app.use(err)

if (config.seed) {
  require('./util/seed')
}

module.exports = app
