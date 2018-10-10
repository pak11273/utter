import User from "./userModel.js"
import {signToken} from "../../auth/auth"

/*
/* signature: (rootValue, args, context, info)
*/
const createUser = (_, args, ctx, info) => {
  const username = args.input.username
  const email = args.input.email
  const password = args.input.password
  console.log("args: ", args.input)
  let newUser = new User(args.input)

  newUser.save(function(err, user) {
    if (err) {
      return err
    }

    let token = signToken(newUser._id)
    // res.json({token: token})
  })
  return newUser
}

const getMe = (_, __, {user}) => {
  return {
    id: 2342342,
    username: "hello",
    createdAt: "yeas",
    updatedAt: "sure"
  }
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    hello: (_, {name}, ctx) => {
      ;`Hello ${name || "Satan"}`
    }
  },

  User: {
    contacts: user => {
      console.log("friends")
      // TODO: Query db for contacts
      return ["Tom", "Bob", "Harry"]
    }
  },

  Mutation: {
    createUser,
    updateMe
  }
}
