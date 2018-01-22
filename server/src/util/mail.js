import express from 'express'
import _ from 'lodash'
import pwd from '../../dist/config/pwd.js'
import nodemailer from 'nodemailer'
import path from 'path'
const mailRouter = express.Router()

mailRouter.post('/', function(req, res) {
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

  // password-reset
  const hbs = require('nodemailer-express-handlebars')

  const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('../templates/'),
    extName: '.html'
  }

  transporter.use('compile', hbs(handlebarsOptions))
})

module.exports = mailRouter
