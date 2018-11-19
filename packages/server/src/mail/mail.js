import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import async from "async"
import User from "../api/user/user-model.js"

const options = {
  viewEngine: "handlebars",
  viewPath: path.join(__dirname, "../../src/views/layouts"),
  extName: ".handlebars"
}
console.log("viewpath: ", path.join(__dirname, "../../src/views/layouts"))

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

transporter.use("compile", hbs(options))

export const sendConfirmEmail = (recipient, link) => {
  const data = {
    from: process.env.APP_EMAIL,
    to: recipient,
    template: "confirmation-email",
    subject: "Please confirm your email account",
    context: {
      confirmEmailUrl: link
    }
  }
  transporter.sendMail(data, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

export const sendForgotPasswordEmail = function(recipient, link) {
  const data = {
    from: process.env.APP_EMAIL,
    to: recipient,
    template: "forgot-password-email",
    subject: "Your password reset request",
    context: {
      passwordUrl: link
    }
  }
  transporter.sendMail(data, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}
