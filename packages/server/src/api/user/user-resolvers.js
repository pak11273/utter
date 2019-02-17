/* eslint-enable no-unused-vars */
import chalk from "chalk"
import jwt from "jsonwebtoken"
import {isEmpty} from "lodash"
import * as yup from "yup"
import config from "../../config"
import {authenticate, decodeToken, signToken} from "../../auth"
import {
  confirmEmail,
  expiredKey,
  duplicateEmail,
  duplicateUsername,
  passwordLocked,
  userNotFound
} from "../shared/error-messages.js"
import {createEmailConfirmLink} from "../../utils/create-confirmation-email-link.js"
import {createForgotPasswordLink} from "../../utils/create-forgot-password-link.js"
import {forgotPasswordPrefix} from "../../constants"
import {formatYupError} from "../../utils/format-yup-error.js"
import {sendConfirmEmail, sendForgotPasswordEmail} from "../../mail/mail"
import User from "./user-model.js"
import {userByToken} from "../shared/resolver-functions.js"

import {
  signupSchema,
  PasswordValidation,
  changePasswordSchema
} from "@utterzone/common"

const changePassword = async (_, args, {redis, url}) => {
  let token = null
  var arrayOfErrors = []
  const redisToken = args.input.token
  const redisKey = `${forgotPasswordPrefix}${redisToken}`
  const userId = await redis.get(redisKey)

  if (!userId) {
    console.log("no user")
    arrayOfErrors.push({
      path: "password",
      message: expiredKey
    })
    return {
      token: null,
      error: arrayOfErrors
    }
  }

  try {
    console.log("args2: ", args)
    args.input["password confirmation"] = args.input.passwordConfirmation
    await changePasswordSchema.validate(args.input, {
      abortEarly: false
    })
  } catch (err) {
    if (err) {
      console.log("invalid")
      arrayOfErrors = formatYupError(err)
      return {
        token: null,
        error: arrayOfErrors
      }
    }
  }

  let user = await User.findById(userId).exec()
  const hashedPassword = user.encryptPassword(args.input.password)
  const updatePromise = User.findByIdAndUpdate(userId, {
    $set: {forgotPasswordLocked: false, password: hashedPassword}
  })
  token = signToken(user._id)
  console.log("token", token)

  const deleteKeyPromise = redis.del(redisKey)

  await Promise.all([updatePromise, deleteKeyPromise])

  return {
    token,
    error: []
  }
}

const signup = async (_, args, {redis, url}, info) => {
  args.input["password confirmation"] = args.input.passwordConfirmation
  let token = null
  var arrayOfErrors = []
  try {
    await signupSchema.validate(args.input, {abortEarly: false})
  } catch (err) {
    if (err) {
      arrayOfErrors = formatYupError(err)
    }
  }
  const {username, email, password} = args.input
  var foundDupeEmail = await User.findOne({email}).exec()
  var foundDupeUsername = await User.findOne({username}).exec()

  if (foundDupeUsername !== null) {
    var error = {
      path: "username",
      message: duplicateUsername
    }
    arrayOfErrors.push(error)
  }

  if (foundDupeEmail !== null) {
    var error = {
      path: "email",
      message: duplicateEmail
    }
    arrayOfErrors.push(error)
  }

  // Valid with unique email
  if (foundDupeEmail === null && isEmpty(arrayOfErrors)) {
    const newUser = new User(args.input)
    newUser.save()
    token = signToken(newUser._id)
    await sendConfirmEmail(
      newUser.email,
      await createEmailConfirmLink(url, newUser._id, redis)
    )

    return {
      token,
      user: newUser,
      error: arrayOfErrors
    }
  }

  return {
    error: arrayOfErrors
  }
}

const login = async (parent, args, ctx, info) => {
  // decipher identifier
  const {identifier, password} = args.input
  let token = ""
  let arrayOfErrors = []

  let username, email
  let criteria =
    identifier.indexOf("@") === -1
      ? {username: identifier}
      : {email: identifier}
  if (!identifier || !password) {
    arrayOfErrors.push({
      path: "identifier",
      message: "username/email or password cannot be blank"
    })
  }
  // check if passwords match
  let user = await User.findOne(criteria).exec()
  if (!user) {
    arrayOfErrors.push({
      path: "identifier",
      message: "invalid username or email"
    })
  } else if (!user.authenticate(password)) {
    // use authenticate() on user.doc, pass in the posted password, hash it and check
    arrayOfErrors.push({path: "password", message: "Invalid Password"})
  } else if (user.forgotPasswordLocked) {
    /* else if (!user.confirmed) { */
    /*   arrayOfErrors.push({ */
    /*     path: "identifier", */
    /*     message: confirmEmail */
    /*   }) */
    /* } */
    arrayOfErrors.push({
      path: "identifier",
      message: passwordLocked
    })
  } else if (user) {
    // assign valid user info
    token = await signToken(user._id)
  }

  return {
    token,
    user,
    error: arrayOfErrors
  }
}

const getUserByToken = (_, args, ctx, info) => {
  var token = ctx.req.headers.authorization || null
  console.log("token: ", token)
  if (token) {
    const result = jwt.verify(token, config.env.JWT, (err, decoded) => {
      console.log("decoded: ", decoded)
      if (err) console.log("err: ", err)
      if (decoded) {
        const userID = decoded._id
        const user = User.findOne({_id: userID})
        return user
      } else {
        return {username: ""}
      }
    })
    return result
  }
}

const getUserById = async (_, args, ctx, info) => {
  let result = await User.findById({id: args.input})
  console.log("result: ", result)
  return result
}

const getUserByUsername = async (_, args, ctx, info) => {
  console.log("userID: ", ctx)
  // const getUserByUsername = (_, __, {user}) => {
  let result = await User.findOne({username: args.input})
  return result
}

const forgotPassword = async (_, {email}, {redis, url}) => {
  let user = await User.findOne({email})

  // TODO: may not implement this because anyone can lock someone's account
  /* await passwordLockedAccount(user._id, redis) */
  const link = await sendForgotPasswordEmail(
    user.email,
    await createForgotPasswordLink(url, user._id, redis)
  )

  return true
}

const subscribe = async (_, {input}, {redis, url, req}, info) => {
  var token = req.headers.authorization || null
  var user = await userByToken(token, (err, data) => {
    if (err) return err
    if (data) return data
  })
  console.log("input: ", input)

  // TODO
  /* x) see if user has the course in his subscriptions array */
  /* x) if user does have it then return true*/
  /* x) if user doesnt have it then add the it to his subscription then return true */

  return false
}

const unsubscribe = async (_, {input}, {redis, url, req}, info) => {
  var token = req.headers.authorization || null
  var user = await userByToken(token, (err, data) => {
    if (err) return err
    if (data) return data
  })
  console.log("input: ", input)

  // TODO
  /* x) see if user has the course in his subscriptions array */
  /* x) if user does have it then remove the course from subscriptions and return false*/
  /* x) if the user doesn't have it then just return false */

  return true
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    getUserById,
    getUserByToken,
    getUserByUsername,
    hello: (_, {name}) => `Hello ${name || "World"}`
  },

  User: {
    contacts: user => {
      console.log("friends")
      // TODO: Query db for contacts
      return ["Tom", "Bob", "Harry"]
    }
  },

  Mutation: {
    changePassword,
    forgotPassword,
    signup,
    subscribe,
    unsubscribe,
    login,
    updateMe
  }
}
