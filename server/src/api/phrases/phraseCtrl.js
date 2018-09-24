import Phrase from './phraseModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

export default {
  params: (req, res, next, id) => {
    Phrase.findById(id).then(
      phrase => {
        if (!phrase) {
          next(new Error('No phrase with that id'))
        } else {
          req.phrase = phrase
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
    Phrase.find(req.query).then(
      phrases => {
        res.json({phrases})
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let phrase = req.phrase
    res.json({phrase: phrase})
  },

  update: (req, res, next) => {
    function customizer(objValue, srcValue) {
      if (_.isArray(objValue)) {
        return (objValue = srcValue)
      }
    }
    let phrase = req.phrase
    let update = req.body.phrase
    _.mergeWith(phrase, update, customizer)

    phrase.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.json(saved.toJSON())
    })
  },

  post: (req, res, next) => {
    Phrase.create(req.body).then(
      phrase => {
        res.json(phrase)
      },
      err => {
        next(err)
      }
    )
  },

  delete: (req, res, next) => {
    req.phrase.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
