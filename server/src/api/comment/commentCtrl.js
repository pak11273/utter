import Comment from './commentModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

export default {
  params: (req, res, next, id) => {
    Comment.findById(id).then(
      comment => {
        if (!comment) {
          next(new Error('No comment with that id'))
        } else {
          req.comment = comment
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    Comment.find({}).then(
      comments => {
        res.json({comment: comments})
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let comment = req.comment
    res.json({comment: comment})
  },

  update: (req, res, next) => {
    let comment = req.comment
    let update = req.body

    _.merge(comment, update)

    comment.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.json(saved.toJSON())
    })
  },

  post: (req, res, next) => {
    Comment.create(req.body).then(
      comment => {
        res.json(comment)
      },
      err => {
        next(err)
      }
    )
  },

  delete: (req, res, next) => {
    req.comment.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
