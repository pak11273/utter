import Dictionary from './dictionaryModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

export default {
<<<<<<< HEAD
  findByParams: (req, res, next, id) => {
=======
  params: (req, res, next, id) => {
>>>>>>> origin/master
    Dictionary.findById(id).then(
      word => {
        if (!word) {
          next(new Error('No word with that id'))
        } else {
          req.word = word
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    // find always returns an array
    // empty objects means return everything. eg.find()
    Dictionary.find(req.query).then(
      words => {
        res.json({words})
        // res.send(words)
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let word = req.word
    res.json({word: word})
  },

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
    let word = req.word
    let update = req.body.word

    let merged = _.merge(word, update)

    word.save((err, saved) => {
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
    Dictionary.create(req.body).then(
      word => {
        res.json(word)
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
    req.word.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
