import Zone from './zoneModel.js'
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
<<<<<<< HEAD

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

  updateOne: (req, res, next) => {
    let zone = req.zone
    let update = req.body

    _.merge(zone, update)

=======
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

>>>>>>> origin/master
    zone.save((err, saved) => {
      if (err) {
        next(err)
      }
      // res.json(saved.toJSON())
      res.send('yes')
    })
  },

<<<<<<< HEAD
  createOne: (req, res, next) => {
=======
  post: (req, res, next) => {
>>>>>>> origin/master
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
