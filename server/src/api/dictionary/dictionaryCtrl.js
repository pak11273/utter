import Dictionary from './dictionaryModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

exports.params = (req, res, next, id) => {
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
}

exports.get = (req, res, next) => {
  Dictionary.find({}).then(
    words => {
      res.json({word: words})
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let word = req.word
  res.json({word: word})
}

exports.update = (req, res, next) => {
  let word = req.word
  let update = req.body

  _.merge(word, update)

  word.save((err, saved) => {
    if (err) {
      next(err)
    }
    res.json(saved.toJSON())
  })
}

exports.post = (req, res, next) => {
  Dictionary.create(req.body).then(
    word => {
      res.json(word)
    },
    err => {
      next(err)
    }
  )
}

exports.delete = (req, res, next) => {
  req.word.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
