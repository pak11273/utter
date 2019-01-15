import rules from "../../app/auth/roles-schema"
import {flatten, uniq} from "lodash"

const check = (rules, roles, action, data) => {
  if (!roles) roles = ["guest"]
  // Users without roles
  roles.map(role => {
    const permissions = rules[role]
    if (!permissions) {
      // role is not present in the rules
      return false
    }
  })

  /* const permissions = rules[roles] */

  // Static rules setup
  var combinedStaticRules = []

  roles.map(role => {
    combinedStaticRules.push(rules[role].static)
  })

  var staticPermissions = uniq(flatten(combinedStaticRules))
  console.log("static: ", staticPermissions)

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }

  // Dynamic rules setup
  var combinedDynamicRules = []

  roles.map(role => {
    combinedDynamicRules.push(rules[role].dynamic)
  })

  var combinedDynamicPermissions = uniq(flatten(combinedDynamicRules))

  const dynamicPermissions = combinedDynamicPermissions.dynamic

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action]
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false
    }

    return permissionCondition(data)
  }
  return false
}

const Can = props =>
  check(rules, props.roles, props.perform, props.data)
    ? props.yes()
    : props.no()

Can.defaultProps = {
  yes: () => null,
  no: () => null
}

export default Can
