import Phrase from './phraseModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'

exports.params = (req, res, next, id) => {
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
}

exports.get = (req, res, next) => {
  // find always returns an array
  // empty objects means return everything. eg.find()
  Phrase.find(req.query).then(
    words => {
      res.json({words})
      // res.send(words)
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let phrase = req.phrase
  res.json({phrase: phrase})
}

exports.update = (req, res, next) => {
  let phrase = req.phrase
  let update = req.body.phrase

  let merged = _.merge(phrase, update)

  phrase.save((err, saved) => {
    if (err) {
      next(err)
    }
    res.json(saved.toJSON())
  })
}

exports.post = (req, res, next) => {
  Phrase.create(req.body).then(
    phrase => {
      res.json(phrase)
    },
    err => {
      next(err)
    }
  )
}

exports.delete = (req, res, next) => {
  req.phrase.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
