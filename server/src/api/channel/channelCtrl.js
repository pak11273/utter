import Channel from './channelModel.js'
import _ from 'lodash'

export default {
  findByParams: (req, res, next, id) => {
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

  createOne: (req, res, next) => {
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

  updateOne: (req, res, next) => {
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

  remove: (req, res, next) => {
    req.channel.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
