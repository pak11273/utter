/* eslint-enable no-unused-vars */
import chalk from "chalk"
import jwt from "jsonwebtoken"
import {isEmpty} from "lodash"
import * as yup from "yup"
import config from "../../config"
import {authenticate, decodeToken, signToken} from "../../auth"
import {
  confirmEmailError,
  expiredKeyError,
  duplicateEmail,
  duplicateUsername,
  passwordLocked,
  userNotFound
} from "../shared/error-messages.js"
import {createEmailConfirmLink} from "../../utils/create-confirmation-email-link.js"
import {createForgotPasswordLink} from "../../utils/create-forgot-password-link.js"
import {forgotPasswordPrefix, confirmEmailPrefix} from "../../constants"
import {formatYupError} from "../../utils/format-yup-error.js"
import {
  sendContactEmail,
  sendConfirmEmail,
  sendForgotPasswordEmail
} from "../../mail/mail"
import User from "./user-model.js"
import {userByToken} from "../shared/resolver-functions.js"
import {stripe} from "../../stripe.js"

import {
  signupSchema,
  PasswordValidation,
  changePasswordSchema
} from "@utterzone/common"

const me = async (_, __, {req}) => {
  console.log("args: ", req.session)
  if (!req.session.userId) {
    return null
  }
  console.log("user: ", User.findById(req.session.userId).lean())
  return User.findById(req.session.userId).lean()
}

const confirmEmail = async (_, args, {redis, url}) => {
  const redisToken = args.input.token
  const redisKey = `${confirmEmailPrefix}${redisToken}`
  const userId = await redis.get(redisKey)

  if (!userId) {
    console.log("no user")
    arrayOfErrors.push({
      path: "password",
      message: expiredKeyError
    })
    return {
      token: null,
      error: arrayOfErrors
    }
  }
  console.log("args: ", args)
  // change confirm to true
  /* User.updateOne(). */
}

const contact = async (_, args, {redis, url}) => {
  const email = await sendContactEmail(args)
  return {
    success: email.accepted,
    errors: email.rejected
  }
}

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
      message: expiredKeyError
    })
    return {
      token: null,
      error: arrayOfErrors
    }
  }

  try {
    args.input["password confirmation"] = args.input.passwordConfirmation
    await changePasswordSchema.validate(args.input, {
      abortEarly: false
    })
  } catch (err) {
    if (err) {
      arrayOfErrors = formatYupError(err)

      return {
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

  const deleteKeyPromise = redis.del(redisKey)

  await Promise.all([updatePromise, deleteKeyPromise])

  return {
    token,
    error: []
  }
}

const createPaidUser = async (_, {source}, {req}, __) => {
  // TODO use auth here and replace this conditional
  if (!req.session || !req.session.userId) {
    throw new Error("Not authenticated.")
  }

  let query = await User.findById(req.session.userId).lean()

  const customer = await stripe.customers.create({
    email: query.email,
    source,
    plan: process.env.STRIPE_PLAN
  })

  let user = await User.findByIdAndUpdate(
    req.session.userId,
    {
      stripeId: customer.id,
      $push: {roles: "paidUser"}
    },
    {new: true}
  ).lean()

  console.log("user: ", user)
  user.save()

  if (!user) {
    throw new Error()
  }

  return user
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
    return newUser
      .save()
      .then(async result => {
        token = signToken(newUser._id)
        result.password = null

        sendConfirmEmail(
          newUser.email,
          await createEmailConfirmLink(url, newUser._id, redis)
        )

        return {
          token,
          user: result,
          error: arrayOfErrors
        }
      })
      .catch(err => {
        throw err
      })
  }

  return {
    error: arrayOfErrors
  }
}

const login = async (parent, args, ctx, info) => {
  console.log("ctx: ", ctx.req)
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
  let user = await User.findOne(criteria)
    .populate("subscriptions")
    .exec()

  /* const subscriptions = user.subscriptions.map(course => { */
  /* return */

  /*     levels: course.find() */
  /*   } */
  /* }) */
  console.log("user: ", user)

  if (!user) {
    arrayOfErrors.push({
      path: "identifier",
      message: "invalid username or email"
    })
  } else if (!user.authenticate(password)) {
    // use authenticate() on user.doc, pass in the posted password, hash it and check
    arrayOfErrors.push({path: "password", message: "Invalid Password"})
  } else if (user.forgotPasswordLocked) {
    arrayOfErrors.push({
      path: "identifier",
      message: passwordLocked
    })
  } else if (user) {
    // assign valid user info
    token = await signToken(user._id)
  }

  console.log("user: ", user)

  ctx.req.session.userId = user._id
  console.log("ctx: ", ctx.req.session)
  console.log("ctx: ", ctx.req.session.userId)

  return {
    token,
    user,
    error: arrayOfErrors
  }
}

const getUserByToken = async (_, args, ctx, info) => {
  try {
    var token = args.token
    if (token) {
      const result = await jwt.verify(token, config.env.JWT)
      if (result) {
        const userId = result._id
        let user = await User.findById(userId)
          .populate("subscriptions")
          .lean()
        return user
      } else {
        return {username: ""}
      }
      console.log("result: ", result)
      return result
    }
  } catch (err) {
    throw err
  }
}

const getUserById = async (_, args, ctx, info) => {
  let result = await User.findById({_id: args._id})
  return result
}

const getUserByUsername = async (_, args, ctx, info) => {
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

const getSubscriptions = async (_, args, {user}) => {
  try {
    const subscriptions = await User.findById(userId)

    return {...subscriptions._doc, _id: subscriptions.id}
  } catch (err) {
    throw err
  }
}

export const userResolvers = {
  Query: {
    getSubscriptions,
    getUserById,
    getUserByToken,
    getUserByUsername,
    hello: (_, {name}) => `Hello ${name || "World"}`,
    me
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
    confirmEmail,
    contact,
    createPaidUser,
    forgotPassword,
    signup,
    login,
    updateMe
  }
}
