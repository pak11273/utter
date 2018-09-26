import Phrase from './phraseModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

export default {
<<<<<<< HEAD
  findByParams: (req, res, next, id) => {
=======
  params: (req, res, next, id) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
    Phrase.create(req.body).then(
      phrase => {
        res.json(phrase)
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
    req.phrase.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
