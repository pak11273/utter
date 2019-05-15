/* @Static rights are those rights which don't need any data apart from the user role. */

/* @Dynamic rights are rights which need additional data to determine access. */

/* Thes schema is only concerned with resources that need to be protected.  Therefore, all resources not specified here are considered public and anyone can view them.  The role "registeredUser" is given to everyone who signs up.  Protected resources MUST be in (resource:action) format. resouce can only be one word while action can be two hypenated eg. course: update-settings. The action should be CRUD like. 

Use hierarchy system: Ensure that no dynamic functions have the same permission functions, otherwise if a user has that roles with same functions, they will be run with @hasRights which will make multiple database calls */

const matchID = (id, matchingID) => {
  if (!id || !matchingID) return false
  return id === matchingID
}

const roles = {
  guest: {
    static: [""]
  },
  test: {
    static: [""],
    dynamic: [
      {
        "test:read": (id, matchingID) => {
          if (!id || !matchingID) return false
          return id === matchingID
        }
      },
      {
        "test:trash": (id, matchingID) => {
          if (!id || !matchingID) return false
          return id === matchingID
        }
      }
    ]
  },
  registeredUser: {
    static: [""],
    dynamic: [
      {
        "course:read-settings": matchID
      },
      {
        "course:update-introduction": matchID
      },
      {
        "course:update-levels": matchID
      },
      {
        "course:update-vocabulary": matchID
      },
      {
        "course:delete": matchID
      },
      {
        "zone:delete": matchID
      }
    ]
  },
  uzAdmin: {
    static: [""],
    dynamic: [
      {
        "admin:read-settings": matchID
      },
      {
        "admin:delete": matchID
      }
    ]
  },
  payMonthly: {
    static: [
      {
        "account:pay-monthly": matchID
      }
    ]
  },
  admin: {
    static: [
      {
        "admin:test": matchID
      }
    ]
  },
  superAdmin: {
    static: [""]
  }
}

export default roles
