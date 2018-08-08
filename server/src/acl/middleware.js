import acl from '../acl'

export const isAllowed = function(req, res, next) {
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
