import User from "./userModel.js"
import jwt from "jsonwebtoken"
import {authenticate, signToken, decodeToken} from "../../auth/auth"

/*
/* signature: (rootValue, args, context, info)
*/
const signup = async (_, args, ctx, info) => {
  const {username, email, password} = args.input

  let user = new User(args.input)

  user.save(function(err, user) {
    if (err) {
      return err
    }

    let token = signToken(user._id)
  })
  return {
    user,
    token
  }
}

const login = async (parent, args, context, info) => {
  // decipher identifier
  const {identifier, password} = args.input

  let username, email
  let criteria =
    identifier.indexOf("@") === -1
      ? {username: identifier}
      : {email: identifier}
  if (!identifier || !password) {
    throw new Error("username/email or password cannot be blank")
  }
  // check if passwords match
  User.findOne(criteria).then(user => {
    if (!user) {
      throw new Error("Invalid username or email")
    }
    // use authenticate() on user.doc, pass in the posted password, hash it and check
    if (!user.authenticate(password)) {
      throw new Error("Invalid Password")
    }

    // assign valid user info
    const token = signToken(user._id)

    return {
      token,
      user
    }
  })
}

const getUserById = async (_, args, ctx, info) => {
  let result = await User.findOne({id: args.input})
  return result
}

const getUserByUsername = async (_, args, ctx, info) => {
  // const getUserByUsername = (_, __, {user}) => {
  let result = await User.findOne({username: args.input})
  return result
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    getUserById,
    getUserByUsername
  },

  User: {
    contacts: user => {
      console.log("friends")
      // TODO: Query db for contacts
      return ["Tom", "Bob", "Harry"]
    }
  },

  Mutation: {
    signup,
    login,
    updateMe
  }
}
