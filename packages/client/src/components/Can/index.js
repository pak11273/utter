import rules from "@utterzone/common/dist/auth/roles-schema"
import {flatten, uniq} from "lodash"

const check = (rules, roles, action, username, ownerId) => {
  if (!roles) roles = ["guest"]
  // Users without roles
  roles.map(role => {
    const permissions = rules[role]
    if (!permissions) {
      // role is not present in the rules
      return false
    }
  })

  // Static rules setup
  var combinedStaticRules = []

  roles.map(role => {
    combinedStaticRules.push(rules[role].static)
  })

  var staticPermissions = uniq(flatten(combinedStaticRules))

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }

  // Dynamic rules setup
  var combinedDynamicRules = []
  roles.map(role => {
    if (rules[role].dynamic) {
      var rulesArr = rules[role].dynamic
    }
    combinedDynamicRules.push(rulesArr)
  })

  var combinedDynamicPermissions = uniq(flatten(combinedDynamicRules))

  const hasPermission = combinedDynamicPermissions.map(
    obj => Object.keys(obj)[0]
  )

  if (hasPermission) {
    const permissionCondition = hasPermission.includes(action)
    if (!permissionCondition) {
      return false
    }

    const keys = Object.keys(rules)

    var userHasRights = null
    keys.map(role => {
      if (rules[role].hasOwnProperty("dynamic")) {
        rules[role].dynamic.map(func => {
          if (func.hasOwnProperty(action)) {
            userHasRights = func[action]
          }
        })
      }
    })

    return userHasRights(username, ownerId)
  }
  return false
}

const Can = props =>
  check(rules, props.roles, props.perform, props.username, props.ownerId)
    ? props.yes()
    : props.no()

Can.defaultProps = {
  yes: () => null,
  no: () => null
}

export default Can
