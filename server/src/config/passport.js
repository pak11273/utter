<<<<<<< HEAD
import {signToken} from '../auth/auth'
=======
import {signToken} from '../auth/auth.js'
>>>>>>> origin/master
import mongoose from 'mongoose'
import passport from 'passport'
import secret from './secrets.js'

const LocalStrategy = require('passport-local').Strategy
const User = mongoose.model('User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

// local strategy not used
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    (email, password, done) => {
      User.findOne({email: email})
        .then(user => {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: {'email or password': 'is invalid'}
            })
          }

          return done(null, user)
        })
        .catch(done)
    }
  )
)
