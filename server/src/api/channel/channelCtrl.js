import Channel from './channelModel.js'
import _ from 'lodash'

export default {
<<<<<<< HEAD
  findByParams: (req, res, next, id) => {
=======
  params: (req, res, next, id) => {
>>>>>>> origin/master
    Channel.findById(id).then(
      channel => {
        if (!channel) {
          next(new Error('No channel with that id'))
        } else {
          req.channel = channel
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
    Channel.create(req.body).then(
      channel => {
        res.json(channel)
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let channel = req.channel
    res.json({channel: channel})
  },

  get: (req, res, next) => {
    Channel.find({}).then(
      channels => {
        res.json({channel: channels})
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
    let channel = req.channel
    let update = req.body
    _.merge(channel, update)

    channel.save((err, saved) => {
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
    req.channel.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
