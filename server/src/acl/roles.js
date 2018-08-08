var acl, adminRoles, guestRoles, userRoles, roles

// Define roles, resources and permissions
adminRoles = {
  roles: ['admin'],
  allows: [
    {
      resources: [
        '/courses',
        '/courses/:id',
        '/users',
        '/users/:id',
        'randomresource'
      ],
      permissions: ['*']
    }
  ]
}

guestRoles = {
  roles: 'guest',
  allows: [
    {
      resources: ['/', '/404', '/login', '/register'],
      permissions: ['get', 'post']
    }
  ]
}

// userRoles = {
//   roles: 'user',
//   allows: [{resources: '/courses', permissions: ['get', 'post']}]
// }

export default [adminRoles, guestRoles]
