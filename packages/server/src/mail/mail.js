import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import async from "async"
import User from "../api/user/user-model.js"

const options = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(__dirname, "../../src/views/partials"),
    layoutsDir: path.join(__dirname, "../../src/views/layouts")
  },
  viewPath: path.join(__dirname, "../../src/views/layouts"),
  extName: ".handlebars"
}

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.ZOHO_USERNAME,
    pass: process.env.ZOHO_PASSWORD
  }
  // gmail account
  /* host: "smtp.gmail.com", */
  /* port: 587, */
  /* secure: false, */
  /* requireTLS: true, */
  /* auth: { */
  /*   user: process.env.GMAIL_USERNAME, */
  /*   pass: process.env.GMAIL_PASSWORD */
  /* } */
})

transporter.use("compile", hbs(options))

export const sendContactEmail = args => {
  return new Promise((resolve, reject) => {
    const data = {
      from: "team@utterzone.com",
      to: "team@utterzone.com",
      template: "contact-email",
      subject: args.input.subject,
      context: {
        name: args.input.name,
        phone: args.input.phone,
        email: args.input.email,
        subject: args.input.subject,
        message: args.input.message
      }
    }
    return transporter.sendMail(data, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

export const sendConfirmEmail = async (recipient, link) => {
  const data = {
    from: process.env.ZOHO_EMAIL,
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
  return link
}

export const sendReConfirmEmail = async (recipient, link) => {
  const data = {
    from: process.env.ZOHO_EMAIL,
    to: recipient,
    template: "reconfirmation-email",
    subject: "Please confirm your email account",
    context: {
      confirmEmailUrl: link
    }
    /* html: "<b>Hello world?</b>" // html body */
  }
  transporter.sendMail(data, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
  return link
}

export const sendForgotPasswordEmail = function(recipient, link) {
  const data = {
    from: process.env.ZOHO_EMAIL,
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
