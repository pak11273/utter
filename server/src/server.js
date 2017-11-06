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
import socketio from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// third party middleware
import middleware from '../dist/middleware/appMiddleware'
middleware(app)

// express middleware
app.use(express.static(path.join(__dirname, 'client/dist'))) //path is relative to this directory
app.use('/cdn', express.static('cdn'))

// connect socket to server
io.on('connection', socket => {
  console.log('a user connected')
  socket.on('message', msg => {
    console.log('message: ', msg)
  })
  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
  socket.broadcast.emit('hi')
  // socket.on('message', body => {
  //   socket.broadcast.emit('message', {
  //     body,
  //     from: socket.id.slice(8)
  //   })
  // })
})

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
