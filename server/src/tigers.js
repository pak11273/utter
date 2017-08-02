import express from 'express'
import _ from 'lodash'

const tigerRouter = express.Router()
let tigers = []
let id = 0

const updateID = (req, res, next) => {
  id++
  req.body.id = id + ''
  next()
}

tigerRouter.param('id', function(req, res, next, id) {
  let tiger = _.find(tigers, {id: id})
  let index = _.findIndex(tigers, {id: id})
  req.index = index
  req.tiger = tiger
  next()
})

tigerRouter
  .route('/')
  .get(function(req, res) {
    res.json(tigers)
  })
  .post(updateID, function(req, res) {
    let tiger = req.body
    tigers.push(tiger)
    res.json(tiger)
  })

tigerRouter
  .route('/:id')
  .get(function(req, res) {
    res.json(req.tiger)
  })
  .put(function(req, res) {
    let changes = req.body
    let updatedTiger = Object.assign(tigers[req.index], changes)
    res.json(updatedTiger)
  })
  .delete(function(req, res) {
    delete tigers[req.index]
    res.send('deleted')
  })

module.exports = tigerRouter
