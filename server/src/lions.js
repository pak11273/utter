import express from 'express'
import _ from 'lodash'
const lionRouter = express.Router()

var lions = []
var id = 0

// custom middleware
const updateID = (req, res, next) => {
  if (!req.body.id) {
    id++
    req.body.id = id + ''
  }
  next()
}

lionRouter.param('id', function(req, res, next, id) {
  let lion = _.find(lions, {id: id})
  let index = _.findIndex(lions, {id: id})
  if (lion) {
    req.lion = lion
    req.index = index
    next()
  } else {
    res.status(404).send('no such lion exists')
  }
})

lionRouter
  .route('/')
  .get(function(req, res) {
    res.json(lions)
  })
  .post(updateID, function(req, res) {
    let lion = req.body

    lions.push(lion)
    res.json(lions)
  })

lionRouter
  .route('/:id')
  .get(function(req, res) {
    res.json(req.lion)
  })
  .put(function(req, res) {
    let update = req.body
    // ensure id isn't being changed
    if (update.id) {
      delete update.id
    }

    // assign an index number from the matched query
    if (!lions[req.index]) {
      res.send('no such thing exits')
    } else {
      res.send(Object.assign(lions[req.index], update))
    }
  })

lionRouter.delete('/:id', function(req, res) {
  delete lions[req.index]
  res.send('deleted')
})

module.exports = lionRouter
