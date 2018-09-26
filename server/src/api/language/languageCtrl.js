import Language from './languageModel.js'
import _ from 'lodash'

export default {
<<<<<<< HEAD
  findByParams: (req, res, next, id) => {
=======
  params: (req, res, next, id) => {
>>>>>>> origin/master
    Language.findById(id).then(
      language => {
        if (!language) {
          next(new Error('No language with that id'))
        } else {
          req.language = language
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
    let newLanguage = req.body

    Language.create(newLanguage).then(
      language => {
        res.json(language)
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    //populate doesn't return a promise, so call exec()
    // TODO: fix so you can use populate.  can't use populate yet because of "schema hasn't been registered for model user error"
    // Language.find().populate('subscribers').exec().then(
    Language.find().then(
      languages => {
        res.json(languages)
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let language = req.language
    res.json(language)
  },

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
    let language = req.language
    let update = req.body

    let saved = _.merge(language, update)

    language.save((err, saved) => {
      if (err) {
        next(err)
      } else {
        res.json(saved)
      }
    })
  },

<<<<<<< HEAD
  remove: (req, res, next) => {
=======
  delete: (req, res, next) => {
>>>>>>> origin/master
    req.language.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
