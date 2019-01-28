import Phrase from "./phraseModel.js"
import {merge, isArray, isEmpty} from "lodash"

export default {
  findByParams: (req, res, next, id) => {
    Phrase.findById(id).then(
      phrase => {
        if (!phrase) {
          next(new Error("No phrase with that id"))
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

  updateOne: (req, res, next) => {
    function customizer(objValue, srcValue) {
      if (isArray(objValue)) {
        return (objValue = srcValue)
      }
    }
    let phrase = req.phrase
    let update = req.body.phrase
    mergeWith(phrase, update, customizer)

    phrase.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.json(saved.toJSON())
    })
  },

  createOne: (req, res, next) => {
    Phrase.create(req.body).then(
      phrase => {
        res.json(phrase)
      },
      err => {
        next(err)
      }
    )
  },

  remove: (req, res, next) => {
    req.phrase.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
