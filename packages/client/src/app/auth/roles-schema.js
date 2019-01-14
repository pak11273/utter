/* @Static scopes are those scopes which don't need any data apart from the user role. */

/* @Dynamic scopes are scopes which need additional data to determine access. */

/* scopes are in the (resource:action) pattern */

const rules = {
  guest: {
    static: ["courses:read", "home:read", "contact:read"]
  },
  registeredUser: {
    static: ["courses:create", "users:getSelf", "home:read", "dashboard:read"],
    dynamic: {
      "courses:update": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false
        return userId === postOwnerId
      }
    }
  },
  admin: {
    static: [
      "courses:read",
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
