// require('babel-register')

// imports
import path from 'path'
import express from 'express'
import nodemailer from 'nodemailer'
import pwd from './config/pwd.js'
import bodyParser from 'body-parser'

const config = require('./config/config')
const app = express()
const logger = require('./util/logger')
const compiler = webpack(webpackConfig)

// require('./server.js')
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.js'

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/sendmail', function(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: pwd.gmail_username,
      pass: pwd.gmail_password
    }
  })

  const mailOptions = {
    from: 'pak11273@gmail.com',
    to: 'admin@pak11273.com',
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

app.use(
  webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
)
app.use(webpackHotMiddleware(compiler))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

// // app.use(express.static(path.join(__dirname, '/../../client/dist')))

// // todo: create and use logger

app.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})
