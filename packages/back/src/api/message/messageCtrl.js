import Message from "./messageModel.js"
import {merge} from "lodash"
import {isEmpty} from "lodash/isEmpty"
import {signToken} from "../../auth/auth"

export default {
  findByParams: (req, res, next, id) => {
    Message.findById(id).then(
      message => {
        if (!message) {
          next(new Error("No message with that id"))
        } else {
          req.message = message
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  get: (req, res, next) => {
    Message.find({}).then(
      messages => {
        res.json({message: messages})
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let message = req.message
    res.json({message: message})
  },

  updateOne: (req, res, next) => {
    let message = req.message
    let update = req.body

    merge(message, update)

    message.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.json(saved.toJSON())
    })
  },

  createOne: (req, res, next) => {
    Message.create(req.body).then(
      message => {
        res.json(message)
      },
      err => {
        next(err)
      }
    )
  },

  remove: (req, res, next) => {
    req.message.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
