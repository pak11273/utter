import Zone from './zoneModel.js'
import _ from 'lodash'
import isEmpty from 'lodash/isEmpty'
import {signToken} from '../../auth/auth'

export default {
  params: (req, res, next, id) => {
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
  },

  get: (req, res, next) => {
    Zone.find({}).then(
      zones => {
        res.json({zone: zones})
      },
      err => {
        next(err)
      }
    )
  },

  getOne: (req, res, next) => {
    let zone = req.zone
    res.json({zone: zone})
  },

  update: (req, res, next) => {
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
  },

  post: (req, res, next) => {
    if (typeof req.body['zipCodes'] === 'String') {
      let jk
    }
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
  },

  remove: (req, res, next) => {
    req.zone.remove((err, removed) => {
      if (err) {
        next(err)
      } else {
        res.json(removed)
      }
    })
  }
}
