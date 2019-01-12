/* Static scopes are those scopes which don't need any data apart from the user role. */

/* Dynamic scopes are scopes which need additional data to determine access. */
/* scope format => resource: action */

const scope = {
  visitor: {
    static: ["posts:list", "home-page:visit"]
  },
  writer: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ],
    dynamic: {
      "posts:edit": ({userId, postOwnerId}) => {
        if (!userId || !postOwnerId) return false
        return userId === postOwnerId
      }
    }
  },
  admin: {
    static: [
      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
}

export default scope
