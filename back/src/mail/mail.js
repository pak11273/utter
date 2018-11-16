import nodemailer from 'nodemailer'
import pwd from '../config/pwd.js'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: pwd.gmail_username,
    pass: pwd.gmail_password
  }
})
