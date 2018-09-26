import Comment from './commentModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

export default {
<<<<<<< HEAD
  findByParams: (req, res, next, id) => {
=======
  params: (req, res, next, id) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
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
