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

// used for gzip bundle.js
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

// sendmail for contact page
app.post('/sendmail', function(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: pwd.gmail_username,
      pass: pwd.gmail_password
    }
  })

  const mailOptions = {
    from: 'utterzone11273@gmail.com',
    to: 'pak11273@gmail.com',
    subject: req.body.subject,
    text:
      'phone: ' +
        ' ' +
        req.body.country +
        ' ' +
        req.body.number +
        '\n\n' +
        'email: ' +
        req.body.email +
        '\n\n' +
        'subjedct: ' +
        req.body.subject +
        '\n\n' +
        'message: ' +
        req.body.letter
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
})

// app route
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../client/dist/index.html'), function(
//     err
//   ) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

// seed the db with dummy data TODO: change the seeding before using this
// if (config.seed) {
//   require('./util/seed')
// }

// error handling middleware
app.use(err)

module.exports = server
