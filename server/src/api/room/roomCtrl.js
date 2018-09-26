import Room from './roomModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import {signToken} from '../../auth/auth'

export default {
  findByParams: (req, res, next, id) => {
    Room.findById(id).then(
      room => {
        if (!room) {
          next(new Error('No room with that id'))
        } else {
          req.room = room
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  createOne: (req, res, next) => {
    Room.create(req.body).then(
      room => {
        res.json(room)
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let room = req.room
    res.json({room: room})
  },

  get: (req, res, next) => {
    Room.find({}).then(
      rooms => {
        res.json({room: rooms})
      },
      err => {
        next(err)
      }
    )
  },

  updateOne: (req, res, next) => {
    let room = req.room
    let update = req.body
    _.merge(room, update)

    room.save((err, saved) => {
      if (err) {
        next(err)
      }
      res.send('yes')
    })
  },

  remove: (req, res, next) => {
    req.room.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
