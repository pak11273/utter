import Dictionary from './dictionaryModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

export default {
  findByParams: (req, res, next, id) => {
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

  updateOne: (req, res, next) => {
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

  createOne: (req, res, next) => {
    Dictionary.create(req.body).then(
      word => {
        res.json(word)
      },
      err => {
        next(err)
      }
    )
  },

  remove: (req, res, next) => {
    req.word.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
