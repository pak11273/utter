import {shield, and, or, not, rule} from "graphql-shield"

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  console.log("user: ", ctx.user)
  return ctx.user !== "blaal"
})

const isAdmin = () => console.log("booyah")
const isEditor = () => console.log("booyah")

export const permissions = shield({
  Query: {},
  Mutation: {
    login: isAuthenticated
  }
})
