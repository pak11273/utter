export const isOwner = (user, resource) => {
  return (
    user._id === resource.owner._id || user.username === resource.owner.username
  )
}

export const hasRights = (user, rights) =>
  rights.some(right => user.rights.includes(right))

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role))
