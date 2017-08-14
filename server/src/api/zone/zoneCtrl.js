import Zone from './zoneModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import auth from '../../auth/auth'
const signToken = auth.signToken

exports.params = (req, res, next, id) => {
  Zone.findById(id).then(
    zone => {
      if (!zone) {
        next(new Error('No zone with that id'))
      } else {
        req.zone = zone
        next()
      }
    },
    err => {
      next(err)
    }
  )
}

exports.get = (req, res, next) => {
  Zone.find({}).then(
    zones => {
      res.json({zone: zones})
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let zone = req.zone
  res.json({zone: zone})
}

exports.update = (req, res, next) => {
  let zone = req.zone
  let update = req.body

  _.merge(zone, update)

  zone.save((err, saved) => {
    if (err) {
      next(err)
    }
    // res.json(saved.toJSON())
    res.send('yes')
  })
}

exports.post = (req, res, next) => {
  let zips = req.body['zipCodes']
  let zip = zips.split(',')
  let newZips = []
  zip.forEach(zipcode => {
    newZips.push(zipcode.trim())
  })

  req.body['zipCodes'] = newZips

  Zone.create(req.body).then(
    zone => {
      res.json(zone)
    },
    err => {
      next(err)
    }
  )
}
exports.delete = (req, res, next) => {
  req.zone.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
