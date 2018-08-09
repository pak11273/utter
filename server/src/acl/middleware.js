import acl from '../acl'

exports.roleCheck = (req, res, next) => {
  console.log('res: ', req.body)
  next()
  // var userId = req.user ? req.user._id : null

  // var userId = req.user._id || 'public'

  // var route = req.path

  // console.log('Matches Route:', req.route.path)

  // console.log('Original route:', route)

  // route = toACLDefinition(route).replace(/\/$/, '') || '/'

  // // check permissions
  // return acl.isAllowed(id, route, req.method.toLowerCase(), function(
  //   err,
  //   allow
  // ) {
  //   if (err) {
  //     // Oh no! An error.
  //     return res.send(500, 'Unexpected authorization error')
  //   }

  //   if (allow) {
  //     // Woohoo, access granted. Invoke next()
  //     return next()
  //   }

  //   // Check again with the raw path
  //   return acl.isAllowed(id, req.path, req.method.toLowerCase(), function(
  //     err,
  //     allow
  //   ) {
  //     if (err) {
  //       // Oh no! An error.
  //       return res.send(500, 'Unexpected authorization error')
  //     }

  //     if (allow) {
  //       // Woohoo, access granted. Invoke next()
  //       return next()
  //     }

  //     // not allowed, sorry
  //     return res.send(403)
  //   })
  // })
}

exports.isAllowed = function(req, res, next) {
  var roles = req.user ? req.user.roles : ['guest']
  // If a course is being processed and the current user created it then allow any manipulation
  if (
    true
    // req.course &&
    // req.user &&
    // req.course.user &&
    // req.course.user.id === req.user.id
  ) {
    return next()
  }

  // Check for user roles
  console.log('acl: ', acl)
  acl.areAnyRolesAllowed(
    roles,
    req.route.path,
    req.method.toLowerCase(),
    function(err, isAllowed) {
      if (err) {
        // An authorization error occurred
        return res.status(500).send('Unexpected authorization error')
      } else {
        if (isAllowed) {
          // Access granted! Invoke next middleware
          return next()
        } else {
          return res.status(403).json({
            message: 'User is not authorized'
          })
        }
      }
    }
  )
}
