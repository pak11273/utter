// ref: https://www.youtube.com/watch?v=xaorvBjCE7A
// ref: https://github.com/thebigredgeek/apollo-resolvers
// TODO: not sure if I'm going to implement this

import {createError, isInstance} from "apollo-errors"
import {createResolver} from "apollo-resolvers"
import {
  alreadyAuthentictedError,
  authorizationError,
  forbiddenError,
  unkownError
} from "./errors/graphql-errors"

/* import schema from "./schema.graphql" */

const baseResolver = createResolver(null, (root, args, ctx, err) => {
  if (isInstance(err)) {
    return err
  }
  return new unkownError({
    data: {
      name: err.name
    }
  })
})

const authenticationResolver = baseResolver.createResolver(
  (root, args, ctx) => {
    const {user} = ctx
    if (!user) throw new authorizationError()
  }
)

const alreadyAuthentictedResolver = baseResolver.createResolver(
  (root, args, ctx) => {
    const {user} = ctx
    if (!user) throw new alreadyAuthentictedError()
  }
)

const isAdminResolver = authenticationResolver.createResolver(
  (root, args, ctx) => {
    const {user} = ctx

    if (!user.isAdmin) throw new forbiddenError()
  }
)

// functional resolvers

const getMyUser = authenticationResolver.createResolver((root, args, ctx) => {
  const {user} = ctx
  return user
})

const signup = alreadyAuthentictedResolver.createResolver(
  async (root, args, ctx) => {
    const {
      models: {userModel}
    } = ctx
    const {username, email, password} = args

    const user = await userModel.signup({
      username,
      email,
      password
    })
  }
)

const login = alreadyAuthentictedResolver.createResolver(
  async (root, args, ctx) => {
    const {
      models: {userModel}
    } = ctx
    const {identity, password} = args

    const user = await userModel.login({
      identtiy,
      password
    })
    ctx.user = user
    return user
  }
)

const updateProfile = alreadyAuthentictedResolver.createResolver(
  (root, args, ctx) => {
    const {
      user,
      models: {userModel}
    } = ctx
    const {username, email} = args

    return userModel.update({
      username,
      email
    })
  }
)

const banUser = isAdminResolver.createResolver((root, args, ctx) => {
  const {
    models: {userModel}
  } = ctx
  const {id} = args
  return userModel.ban(id)
})

// Schema creation

const typeDefs = {schema}

const resolvers = {
  Query: {
    getMyUser
  },

  Mutation: {
    signup,
    updateProfile,
    banUser
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
})
