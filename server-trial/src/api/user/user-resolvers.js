/* eslint-enable no-unused-vars */
import chalk from "chalk"
import isEmpty from "lodash/isEmpty"
import jwt from "jsonwebtoken"
import * as yup from "yup"
import {PasswordValidation} from "../shared/yup-schemas"
import {authenticate, signToken, decodeToken} from "../../auth/auth"
import {
  confirmEmail,
  duplicateEmail,
  emailNotLongEnough,
  passwordNotLongEnough,
  passwordLocked,
  userNotFound
} from "../shared/error-messages.js"
import {createEmailConfirmLink} from "../../utils/create-confirmation-email-link.js"
import {createForgotPasswordLink} from "../../utils/create-forgot-password-link.js"
import {forgotPasswordPrefix} from "../../constants"
import {formatYupError} from "../../utils/format-yup-error.js"
import {sendConfirmEmail, sendForgotPasswordEmail} from "../../mail/mail"
import User from "./user-model.js"

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(),
  password: PasswordValidation
})

const newPasswordSchema = yup.object().shape({
  newPassword: PasswordValidation
})

/*
/* signature: (rootValue, args, context, info)
*/

const forgotPasswordChange = async (_, {newPassword, key}, {redis, url}) => {
  const redisKey = `${forgotPasswordPrefix} ${key}`

  const userId = redis.get(redisKey)
  if (!userId) {
    return [
      {
        path: "key",
        message: expiredKey
      }
    ]
  }

  try {
    await newPasswordSchema.validate({newPassword}.input, {abortEarly: false})
  } catch (err) {
    if (err) {
      arrayOfErrors = formatYupError(err)
    }
  }

  const hashedPassword = user.encryptPassword(newPassword)

  const updatePromise = user.findByIdAndUpdate(userId, {
    $set: {forgotPasswordLocked: false, password: hashedPassword}
  })

  const deleteKeyPromise = redis.del(redisKey)

  await Promise.all([updatePromise, deleteKeyPromise])

  return null
}

const signup = async (_, args, {redis, url}, info) => {
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
  const {identifier, password} = args
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
  } else if (!user.confirmed) {
    arrayOfErrors.push({
      path: "identifier",
      message: confirmEmail
    })
  } else if (user.forgotPasswordLocked) {
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
  if (!user) {
    return [
      {
        path: "email",
        message: userNotFound
      }
    ]
  }
  // TODO: add frontend url in production
  // TODO: may not implement this because anyone can lock someone's account
  /* await passwordLockedAccount(user._id, redis) */
  await sendForgotPasswordEmail(
    user.email,
    await createForgotPasswordLink(url, user._id, redis)
  )
  return [
    {
      path: "email",
      message: "email sent"
    }
  ]
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
    forgotPasswordChange,
    forgotPassword,
    signup,
    login,
    updateMe
  }
}
