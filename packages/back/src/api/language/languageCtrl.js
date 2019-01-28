import Language from "./languageModel.js"
import {merge} from "lodash"

export default {
  findByParams: (req, res, next, id) => {
    Language.findById(id).then(
      language => {
        if (!language) {
          next(new Error("No language with that id"))
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

  createOne: (req, res, next) => {
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

  updateOne: (req, res, next) => {
    let language = req.language
    let update = req.body

    let saved = merge(language, update)

    language.save((err, saved) => {
      if (err) {
        next(err)
      } else {
        res.json(saved)
      }
    })
  },

  remove: (req, res, next) => {
    req.language.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
