import Channel from './channelModel.js'
import _ from 'lodash'

exports.params = (req, res, next, id) => {
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
}

exports.post = (req, res, next) => {
  Channel.create(req.body).then(
    channel => {
      res.json(channel)
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let channel = req.channel
  res.json({channel: channel})
}

exports.get = (req, res, next) => {
  Channel.find({}).then(
    channels => {
      res.json({channel: channels})
    },
    err => {
      next(err)
    }
  )
}

exports.update = (req, res, next) => {
  let channel = req.channel
  let update = req.body
  _.merge(channel, update)

  channel.save((err, saved) => {
    if (err) {
      next(err)
    }
    res.send('yes')
  })
}

exports.delete = (req, res, next) => {
  req.channel.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
