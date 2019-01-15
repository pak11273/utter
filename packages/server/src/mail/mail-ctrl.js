import User from "../api/user/user-model"
import async from "async"
import bcrypt from "bcrypt"
import crypto from "crypto"
import mailRouter from "../mail/mail-routes.js"
import path from "path"
import {transporter} from "./mail.js"

// add nodemailer-express-handlebars to transporter
import hbs from "nodemailer-express-handlebars"

var options = {
  viewEngine: "handlebars",
  viewPath: path.resolve("../utter/server/src/templates/email"),
  extName: ".html"
}

transporter.use("compile", hbs(options))

export default {
  contactmail: function(req, res) {
    console.log("req.body: ", req.body)
    const data = {
      from: "utterzone11273@gmail.com",
      to: "pak11273@gmail.com",
      template: "contact-email",
      subject: req.body.subject,
      context: {
        name: req.body.name,
        phone: req.body.country + " " + req.body.number,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.letter
      }
    }
    transporter.sendMail(data, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })
  },

  forgotPassword: function(req, res) {
    async.waterfall(
      [
        function(done) {
          User.findOne({
            email: req.body.email
          }).exec(function(err, user) {
            if (user) {
              done(err, user)
            } else {
              done(
                "We're sorry. There was no user found with that email address."
              )
            }
          })
        },
        function(user, done) {
          // create the random token
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString("hex")
            done(err, user, token)
          })
        },
        function(user, token, done) {
          User.findByIdAndUpdate(
            {_id: user._id},
            {
              reset_password_token: token,
              reset_password_expires: Date.now() + 86400000
            },
            {upsert: true, new: true}
          ).exec(function(err, new_user) {
            done(err, token, new_user)
          })
        },
        function(token, user, done) {
          var data = {
            to: user.email,
            from: "utter@utter.zone",
            template: "forgot-password-email",
            subject: "Password help has arrived!",
            context: {
              // TODO: change this url in production
              url:
                "http://localhost:8080/reset-password?user=" +
                user.username +
                "&token=" +
                token,
              name: user.username
            }
          }
          // done(null, token, user)

          transporter.sendMail(data, function(err) {
            if (!err) {
              done(err, token, user)
            } else {
              return done(null, token, user)
            }
          })
        }
      ],
      function(err, token, new_user) {
        if (err) {
          return res.status(422).json({message: err})
        } else {
          res
            .status(200)
            .json({message: "Kindly check your email for further instructions"})
        }
      }
    )
  },

  resetPassword: function(req, res, next) {
    User.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function(err, user) {
      if (!err && user) {
        if (req.body.password === req.body.passwordConfirmation) {
          user.password = user.encryptPassword(req.body.password)
          user.reset_password_token = undefined
          user.reset_password_expires = undefined
          user.save(function(err) {
            if (err) {
              return res.status(422).send({
                message: err
              })
            } else {
              var data = {
                to: user.email,
                from: "utterzone11273@gmail.com",
                template: "reset-password-email",
                subject: "Password Reset Confirmation",
                context: {
                  name: user.username
                }
              }

              transporter.sendMail(data, function(err) {
                if (!err) {
                  return res.json({message: "Password reset"})
                } else {
                  return done(err)
                }
              })
            }
          })
        } else {
          return res.status(422).send({
            message: "Passwords do not match"
          })
        }
      } else {
        return res.status(400).send({
          message: "Password reset token is invalid or has expired."
        })
      }
    })
  }
}
