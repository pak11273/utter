import Event from './eventModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

exports.params = (req, res, next, id) => {
  Event.findById(id).then(
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
}

exports.get = (req, res, next) => {
  res.status(201).json({success: true})
}

exports.getOne = (req, res, next) => {
  res.status(201).json({success: true})
}

exports.update = (req, res, next) => {
  res.status(201).json({success: true})
}

exports.post = (req, res, next) => {
  res.status(201).json({success: true})
  // let newEvent = new Event(req.body)

  //   newEvent.save(function(err, user) {
  //     if (err) {
  //       return next(err)
  //     }

  // res.status(201).json({success: true})
  // })
}

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
