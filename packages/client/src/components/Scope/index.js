import scopes from "../../app/roles-schema.js"

const check = (scopes, role, action, data) => {
  const permissions = scopes[role]
  if (!permissions) {
    // role is not present in the scopes
    return false
  }

  const staticPermissions = permissions.static

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }

  const dynamicPermissions = permissions.dynamic

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

const Scope = props =>
  check(scopes, props.role, props.perform, props.data)
    ? props.yes()
    : props.no()

Scope.defaultProps = {
  yes: () => null,
  no: () => null
}

export default Scope
