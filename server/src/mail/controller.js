import User from '../api/user/userModel'
import async from 'async'
import crypto from 'crypto'
import mailRouter from '../util/mail.js'
import path from 'path'
import {transporter} from './mail.js'

// add nodemailer-express-handlebars to transporter
import hbs from 'nodemailer-express-handlebars'

// var options = {
//   viewEngine: 'handlebars',
//   viewPath: path.resolve('../templates/email'),
//   extName: '.html'
// }

// transporter.use('compile', hbs(options))

exports.contactmail = function(req, res) {
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
}

exports.forgotPassword = function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user)
          } else {
            done('User not found.')
          }
        })
      }
      // function(user, done) {
      //   // create the random token
      //   crypto.randomBytes(20, function(err, buffer) {
      //     var token = buffer.toString('hex')
      //     done(err, user, token)
      //   })
      // },
      // function(user, token, done) {
      //   User.findByIdAndUpdate(
      //     {_id: user._id},
      //     {
      //       reset_password_token: token,
      //       reset_password_expires: Date.now() + 86400000
      //     },
      //     {upsert: true, new: true}
      //   ).exec(function(err, new_user) {
      //     res.json({user: new_user})
      //     // done(err, token, new_user)
      //   })
      // }
      // function(token, user, done) {
      //   var data = {
      //     to: user.email,
      //     from: 'utter@utter.zone',
      //     template: 'forgot-password-email',
      //     subject: 'Password help has arrived!',
      //     context: {
      //       url: 'http://localhost:3000/auth/reset_password?token=' + token,
      //       name: user.username
      //     }
      //   }

      //   transporter.sendMail(data, function(err) {
      //     if (!err) {
      //       return res.json({
      //         message: 'Kindly check your email for further instructions'
      //       })
      //     } else {
      //       return done(err)
      //     }
      //   })
      // }
    ],
    function(err) {
      return res.status(422).json({message: err})
    }
  )
}

exports.resetPassword = function(req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.hash_password = bcrypt.hashSync(req.body.newPassword, 10)
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
              from: email,
              template: 'reset-password-email',
              subject: 'Password Reset Confirmation',
              context: {
                name: user.username
              }
            }

            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({message: 'Password reset'})
              } else {
                return done(err)
              }
            })
          }
        })
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        })
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      })
    }
  })
}
