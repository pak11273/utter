import gql from "graphql-tag"

export const userTypeDefs = gql`
  extend type User {
    avatar: String
    blocked: [String]
    contacts: [User]
    ccLast4: String
    confirmed: Boolean
    createdCourses: [Course!]
    createdAt: String
    email: String!
    firstName: String
    forgotPasswordLocked: Boolean
    gender: String
    hostedZone: Zone
    _id: ID
    isCanceled: Boolean
    lastName: String
    password: String
    requests: [User]
    roles: [String]
    rights: [String]
    stat: String
    stripeId: String
    subscriptions: [Course]
    updatedAt: String
    username: String
  }
`
