import Message from './messageModel.js'
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
    Message.findById(id).then(
      message => {
        if (!message) {
          next(new Error('No message with that id'))
        } else {
          req.message = message
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    Message.find({}).then(
      messages => {
        res.json({message: messages})
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let message = req.message
    res.json({message: message})
  },

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
    let message = req.message
    let update = req.body

    _.merge(message, update)

    message.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.json(saved.toJSON())
    })
  },

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
    Message.create(req.body).then(
      message => {
        res.json(message)
      },
      err => {
        next(err)
      }
    )
  },

<<<<<<< HEAD
  remove: (req, res, next) => {
=======
  delete: (req, res, next) => {
>>>>>>> origin/master
    req.message.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
