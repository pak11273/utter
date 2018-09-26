import Room from './roomModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
<<<<<<< HEAD
import {signToken} from '../../auth/auth'

export default {
  findByParams: (req, res, next, id) => {
=======
import {signToken} from '../../auth/auth.js'

export default {
  params: (req, res, next, id) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  updateOne: (req, res, next) => {
=======
  update: (req, res, next) => {
>>>>>>> origin/master
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

<<<<<<< HEAD
  remove: (req, res, next) => {
=======
  delete: (req, res, next) => {
>>>>>>> origin/master
    req.room.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
