/* @Static scopes are those scopes which don't need any data apart from the user role. */

/* @Dynamic scopes are scopes which need additional data to determine access. */

/* Thes schema is only concerned with resources that need to be protected.  Therefore, all resources not specified here are considered public and anyone can view them.  The role "registeredUser" is given to everyone who signsup.  Protected resources have scopes in the (resource:action) format. */

const rules = {
  guest: {
    static: ["home:read", "contact:read", "pricing:read", "login:read"]
  },
  registeredUser: {
    static: [
      "courses:create",
      "users:getSelf",
      "dashboard:read",
      "contact:read"
    ],
    dynamic: {
      "course-settings:read": ({userId, courseOwnerId}) => {
        if (!userId || !courseOwnerId) return false
        return userId === courseOwnerId
      },
      "course-introduction:update": ({userId, courseOwnerId}) => {
        if (!userId || !courseOwnerId) return false
        return userId === courseOwnerId
      }
    }
  },
  admin: {
    static: [
      "courses:create",
      "courses:update",
      "courses:delete",
      "users:get",
      "users:getSelf",
      "home:read",
      "dashboard:read"
    ]
  }
}

export default rules
