import User from './userModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
<<<<<<< HEAD
import {signToken} from '../../auth/auth'

export default {
  findByParams: (req, res, next, id) => {
=======
import {signToken} from '../../auth/auth.js'

export default {
  params: (req, res, next, id) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
    let update = req.body
    User.findOneAndUpdate({_id: req.body._id}, update, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.json(data)
      }
    })
  },

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  remove: (req, res, next) => {
=======
  delete: (req, res, next) => {
>>>>>>> origin/master
    req.user.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
