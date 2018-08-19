import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()
import createRoutes from '../util/createRoutes.js'
// import controller from './ctrl.js'

const acl = require('../acl/index.js').getAcl()

// createRoutes(controller, router)

// Simple overview of granted permissions
router.route('/info').get(function(req, res, next) {
  acl.allowedPermissions(
    get_user_id(),
    ['/info', '/secret', '/topsecret'],
    function(error, permissions) {
      res.json(permissions)
    }
  )
})

// Only for users and higher
router.route('/secret', acl.middleware(1, get_user_id), function(
  request,
  response,
  next
) {
  response.send('Welcome Sir!')
})

// Only for admins
router.route('/topsecret', acl.middleware(1, get_user_id), function(
  request,
  response,
  next
) {
  response.send('Hi Admin!')
})

// Setting a new role
router.route('/allow/:user/:role', function(request, response, next) {
  acl.addUserRoles(request.params.user, request.params.role)
  response.send(request.params.user + ' is a ' + request.params.role)
})

// Unsetting a role
router.route('/disallow/:user/:role', function(request, response, next) {
  acl.removeUserRoles(request.params.user, request.params.role)
  response.send(
    request.params.user + ' is not a ' + request.params.role + ' anymore.'
  )
})

// Provide logic for getting the logged-in user
//  This is a job for your authentication layer
function get_user_id(request, response) {
  return 'bob'
}

module.exports = router
