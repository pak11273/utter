// utility and config imports
import path from 'path'
import logger from '../dist/util/logger'
import error from '../dist/middleware/error'
import config from '../dist/config/config.js'
import pwd from '../dist/config/pwd.js'
import nodemailer from 'nodemailer'
import _ from 'lodash'

// webpack hmr imports - not necessary for production TODO:remove for production
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.js'

// express and third party middleware
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

// custom middleware
import middleware from '../dist/middleware/appMiddleware'

// variables
const app = express()
const compiler = webpack(webpackConfig)

// require('./server.js')

// global middleware (application wide)
app.use(express.static(path.join(__dirname, '/../../client/dist')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// hmr global middleware : turn this on for development
app.use(
  webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
)
app.use(webpackHotMiddleware(compiler))

// Routers
import api from '../dist/api'
import auth from '../dist/auth/routes.js'
import lionRouter from './lions.js'
import tigerRouter from './tigers.js'

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

// mounts
app.use('/lions', lionRouter)
app.use('/tigers', tigerRouter)

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
app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message)
    res.status(500).send(err)
  }
})

// import cors from 'cors';
mongoose.Promise = bluebird

mongoose.connect(config.db.url)

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
