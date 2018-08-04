import node_acl from 'acl'
import mongoose from 'mongoose'

module.exports = app => {
  // ref: https://stackoverflow.com/questions/22827493/running-node-acl-with-mongoose-on-expressjs
  mongoose.connection.on('connected', function(error) {
    if (error) throw error
    //you must set up the db when mongoose is connected or your will not be able to write any document into it
    const mongodbBackend = new node_acl.mongodbBackend(
      mongoose.connection.db,
      'acl_'
    )
    // ref: https://gist.github.com/danwit/11307969
    const logger = () => {
      return {
        debug: function(msg) {
          console.log('-DEBUG-', msg)
        }
      }
    }

    const acl = new node_acl(mongodbBackend, logger())

    set_roles()
    set_routes()

    function set_roles() {
      // Define roles, resources and permissions
      acl.allow([
        {
          roles: 'admin',
          allows: [
            {resources: '/secret', permissions: 'create'},
            {resources: '/topsecret', permissions: '*'}
          ]
        },
        {
          roles: 'User',
          allows: [{resources: '/secret', permissions: 'get'}]
        },
        {
          roles: 'guest',
          allows: []
        }
      ])

      // Inherit roles
      //  Every user is allowed to do what guests do
      //  Every admin is allowed to do what users do
      acl.addRoleParents('user', 'guest')
      acl.addRoleParents('admin', 'user')
    }

    // Defining routes ( resources )
    function set_routes() {
      // Simple overview of granted permissions
      app.get('/info', function(request, response, next) {
        acl.allowedPermissions(
          get_user_id(),
          ['/info', '/secret', '/topsecret'],
          function(error, permissions) {
            response.json(permissions)
          }
        )
      })

      // Only for users and higher
      app.get('/secret', acl.middleware(1, get_user_id), function(
        request,
        response,
        next
      ) {
        response.send('Welcome Sir!')
      })

      // Only for admins
      app.get('/topsecret', acl.middleware(1, get_user_id), function(
        request,
        response,
        next
      ) {
        response.send('Hi Admin!')
      })

      // Setting a new role
      app.get('/allow/:user/:role', function(request, response, next) {
        acl.addUserRoles(request.params.user, request.params.role)
        response.send(request.params.user + ' is a ' + request.params.role)
      })

      // Unsetting a role
      app.get('/disallow/:user/:role', function(request, response, next) {
        acl.removeUserRoles(request.params.user, request.params.role)
        response.send(
          request.params.user + ' is not a ' + request.params.role + ' anymore.'
        )
      })
    }

    // Provide logic for getting the logged-in user
    //  This is a job for your authentication layer
    function get_user_id(request, response) {
      return 'bob'
    }
  })
}
