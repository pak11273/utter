var acl,
  adminRoles,
  sponsorRoles,
  sponsoredRoles,
  paidUserRoles,
  registeredUserRoles,
  subscriberRoles,
  guestRoles,
  roles

// Define roles, resources and permissions
adminRoles = {
  roles: ['admin'],
  allows: [
    {
      resources: ['/courses', '/courses/:id', '/users', '/users/:id'],
      permissions: ['*']
    }
  ]
}

sponsorRoles = {
  roles: ['sponsor'],
  allows: [
    {
      resources: ['/courses'],
      permissions: ['*']
    }
  ]
}

sponsoredRoles = {
  roles: ['sponsored'],
  allows: [
    {
      resources: ['/courses'],
      permissions: ['*']
    }
  ]
}

paidUserRoles = {
  roles: ['paidUser'],
  allows: [
    {
      resources: ['/courses'],
      permissions: ['*']
    }
  ]
}

registeredUserRoles = {
  roles: ['registeredUser'],
  allows: [
    {
      resources: ['/404'],
      permissions: ['get', 'post']
    }
  ]
}

guestRoles = {
  roles: 'guest',
  allows: [
    {
      resources: ['/', '/404', '/login', '/signup'],
      permissions: ['get', 'post']
    }
  ]
}

subscriberRoles = {
  roles: ['subscriber'],
  allows: [
    {
      resources: ['/courses'],
      permissions: ['*']
    }
  ]
}

export default [
  adminRoles,
  sponsorRoles,
  sponsoredRoles,
  paidUserRoles,
  registeredUserRoles,
  subscriberRoles,
  guestRoles
]
