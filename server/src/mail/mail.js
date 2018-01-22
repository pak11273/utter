import nodemailer from 'nodemailer'
import pwd from '../../dist/config/pwd.js'

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: pwd.gmail_username,
    pass: pwd.gmail_password
  }
})
