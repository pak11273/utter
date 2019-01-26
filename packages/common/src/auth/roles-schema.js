/* @Static scopes are those scopes which don't need any data apart from the user role. */

/* @Dynamic scopes are scopes which need additional data to determine access. */

/* Thes schema is only concerned with resources that need to be protected.  Therefore, all resources not specified here are considered public and anyone can view them.  The role "registeredUser" is given to everyone who signsup.  Protected resources have scopes in the (resource:action) format. */

/*  Use hierarchy system: Ensure that no dynamic functions have the same permission functions, otherwise if a user has that roles with same functions, they will be run with @hasScope which will make multiple database calls */

const roles = {
  guest: {
    static: ["home:read", "contact:read", "pricing:read", "login:read"]
  },
  test: {
    static: ["test:create"],
    dynamic: [
      {
        "test:trash": (id, ownerId) => {
          if (!id || !ownerId) return false
          return id === ownerId
        }
      }
    ]
  },
  registeredUser: {
    static: [
      "course:read",
      "courses:create",
      "users:getSelf",
      "dashboard:read",
      "contact:read"
    ],
    dynamic: [
      {
        "course:update": (username, courseAuthorUsername) => {
          if (!username || !courseAuthorUsername) return false
          return username === courseAuthorUsername
        }
      },
      {
        "course:delete": (username, courseAuthorUsername) => {
          if (!username || !courseAuthorUsername) return false
          return username === courseAuthorUsername
        }
      },
      {
        "test:trash": (id, ownerId) => {
          console.log("id: ", id)
          console.log("ownerId: ", ownerId)
          if (!id || !ownerId) return false
          return id === ownerId
        }
      }
    ]
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

export default roles
