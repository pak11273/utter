/* eslint-enable no-unused-vars */
import chalk from "chalk"
import isEmpty from "lodash/isEmpty"
import jwt from "jsonwebtoken"
import * as yup from "yup"
import {authenticate, signToken, decodeToken} from "../../auth/auth"
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
import {
  signupSchema,
  PasswordValidation,
  changePasswordSchema
} from "@utterzone/common"

const changePassword = async (_, args, {redis, url}) => {
  console.log("args: ", args)
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
      console.log("invalide")
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
    let newUser = new User(args.input)
    let signedUser = await newUser.save()
    token = signToken(signedUser._id)
    await sendConfirmEmail(
      newUser.email,
      await createEmailConfirmLink(url, signedUser._id, redis)
    )
  }

  return {
    token,
    error: arrayOfErrors
  }
}

const login = async (parent, args, context, info) => {
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
  console.log("criteria: ", criteria)
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
    error: arrayOfErrors
  }
}

const getUserById = async (_, args, ctx, info) => {
  let result = await User.findOne({id: args.input})
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

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    getUserById,
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
    login,
    updateMe
  }
}
