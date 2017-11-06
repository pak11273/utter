import Message from './messageModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

exports.params = (req, res, next, id) => {
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
}

exports.get = (req, res, next) => {
  Message.find({}).then(
    messages => {
      res.json({message: messages})
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let message = req.message
  res.json({message: message})
}

exports.update = (req, res, next) => {
  let message = req.message
  let update = req.body

  _.merge(message, update)

  message.save((err, saved) => {
    if (err) {
      next(err)
    }
    res.json(saved.toJSON())
  })
}

exports.post = (req, res, next) => {
  Message.create(req.body).then(
    message => {
      res.json(message)
    },
    err => {
      next(err)
    }
  )
}

exports.delete = (req, res, next) => {
  req.message.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
