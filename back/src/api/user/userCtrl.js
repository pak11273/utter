import User from './userModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import {signToken} from '../../auth/auth'

export default {
  findByParams: (req, res, next, id) => {
    User.findById(id).then(
      user => {
        if (!user) {
          next(new Error('No user with that id'))
        } else {
          req.user = user
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    User.find({})
      .select('-password')
      .exec()
      .then(
        users => {
          res.json(
            users.map(user => {
              return user.toJSON()
            })
          )
        },
        err => {
          next(err)
        }
      )
  },

  getOne: (req, res, next) => {
    let user = req.user
    res.json(user)
  },

  updateOne: (req, res, next) => {
    let update = req.body
    User.findOneAndUpdate({_id: req.body._id}, update, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.json(data)
      }
    })
  },

  createOne: (req, res, next) => {
    console.log('users: ', req.user)
    let newUser = new User(req.body)

    newUser.save(function(err, user) {
      if (err) {
        return next(err)
      }

      let token = signToken(newUser._id)
      res.json({token: token})
    })
  },

  remove: (req, res, next) => {
    req.user.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
