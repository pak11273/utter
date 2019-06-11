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
  sendReConfirmEmail,
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
  if (!req.session.userId) {
    return null
  }
  const user = await User.findById(req.session.userId)
    .populate("requests")
    /* .populate("subscriptions") */
    .lean()

  return user
}

const acceptContact = async (_, args, {req}) => {
  console.log("args: ", args)
  if (!req.session.userId) {
    return null
  }

  const sender = await User.findOne({username: args.senderUsername}).lean()

  const contact = await User.findOneAndUpdate(
    {_id: req.session.userId, contacts: {$ne: sender._id}},
    {
      $push: {
        contacts: sender
      },
      $pull: {
        requests: sender._id
      },
      $inc: {totalRequests: -1}
    },
    {new: true}
  ).lean()

  const updatedSender = await User.updateOne(
    {_id: sender._id, contacts: {$ne: contact._id}},
    {
      $push: {
        contacts: contact
      },
      $pull: {
        sentRequests: {
          username: contact.username
        }
      }
    },
    {new: true}
  )

  console.log("sender: ", sender)

  return sender
}

const rejectContact = async (_, args, {req}) => {
  if (!req.session.userId) {
    return null
  }

  const sender = await User.findOne({username: args.senderUsername}).lean()

  const contact = await User.findOneAndUpdate(
    {_id: req.session.userId, contacts: {$ne: sender._id}},
    {
      $pull: {
        requests: sender._id
      },
      $inc: {totalRequests: -1}
    },
    {new: true}
  ).lean()

  const updatedSender = await User.updateOne(
    {_id: sender._id, contacts: {$ne: contact._id}},
    {
      $pull: {
        sentRequests: {
          username: contact.username
        }
      }
    },
    {new: true}
  )

  return contact
}

const addContact = async (_, args, {redis, url}) => {
  try {
    const senderInfo = await User.findOne({username: args.sender}).exec()
    const contact = await User.findOneAndUpdate(
      {
        username: args.contact,
        requests: {$ne: senderInfo._id},
        contacts: {$ne: senderInfo._id}
      },
      {
        $push: {
          requests: senderInfo
        },
        $inc: {totalRequests: 1}
      },
      {
        new: true
      }
    )

    if (args.sender) {
      const senderUpdated = await User.updateOne(
        {
          username: args.sender,
          "sentRequests.username": {$ne: args.contact}
        },
        {
          $push: {
            sentRequests: {
              username: args.contact
            }
          }
        },
        {new: true}
      )
    }

    if (!contact) {
      throw new Error("You have already sent this person a contact request.")
    }

    return {
      _id: contact._id,
      username: args.sender
    }
  } catch (err) {
    return err
  }
}

const confirmEmail = async (_, args, {redis, url}) => {
  const redisToken = args.input.token
  const redisKey = `${confirmEmailPrefix}${redisToken}`
  const userId = await redis.get(redisKey)

  if (!userId) {
    arrayOfErrors.push({
      path: "password",
      message: expiredKeyError
    })
    return {
      token: null,
      error: arrayOfErrors
    }
  }
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

const cancelPayMonthly = async (_, __, {req}, ___) => {
  // TODO: delay cancellation until their subscription is over
  if (!req.session || !req.session.userId) {
    throw new Error("Not authenticated.")
  }

  let user = await User.findByIdAndUpdate(
    req.session.userId,
    {
      isCanceled: true,
      ccLast4: null,
      $pull: {roles: "payMonthly"}
    },
    {new: true}
  ).lean()

  if (!user || !user.stripeId || !user.roles.includes("payMonthly")) {
    throw new Error()
  }

  const customer = await stripe.customers.retreive(user.stripeId)

  const [subscription] = customer.subscriptions.data

  await stripe.subscriptions.del(subscription.id)

  if (customer.default_source) {
    await stripe.customers.deleteCard(user.stripeId, customer.default_source)
  }

  return user
}

const changeCreditCard = async (_, {source, ccLast4}, {req}, __) => {
  if (!req.session || !req.session.userId) {
    throw new Error("Not authenticated.")
  }

  let user = await User.findByIdAndUpdate(
    req.session.userId,
    {
      ccLast4
    },
    {new: true}
  ).lean()

  if (!user || !user.stripeId || !user.roles.includes("payMonthly")) {
    throw new Error()
  }

  const customer = await stripe.customers.update(user.stripeId, {source})

  if (!customer) {
    throw new Error()
  }

  return user
}

const changePassword = async (_, {input}, {redis, url}) => {
  let token = null
  var arrayOfErrors = []
  const redisToken = input.token
  const redisKey = `${forgotPasswordPrefix}${redisToken}`
  const userId = await redis.get(redisKey)

  if (!userId) {
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
    input["password confirmation"] = input.passwordConfirmation
    await changePasswordSchema.validate(input, {
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
  const hashedPassword = user.encryptPassword(input.password)
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

const createPayMonthly = async (_, {source, ccLast4}, {req}, __) => {
  if (!req.session || !req.session.userId) {
    throw new Error("Not authenticated.")
  }

  let query = await User.findById(req.session.userId).lean()

  let stripeId = query.stripeId
  if (!stripeId) {
    const customer = await stripe.customers.create({
      email: query.email,
      source,
      plan: process.env.STRIPE_PLAN
    })
    stripeId = customer.id
  } else {
    await stripe.customers.update(stripeId, {
      source
    })
    await stripe.subscriptions.create({
      customer: stripeId,
      items: [
        {
          plan: process.env.STRIPE_PLAN
        }
      ]
    })
  }

  let user = await User.findByIdAndUpdate(
    req.session.userId,
    {
      ccLast4: ccLast4,
      stripeId: stripeId,
      $addToSet: {roles: "payMonthly"} // addToSet if unique
    },
    {new: true}
  ).lean()

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

        const link = await sendConfirmEmail(
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
    .populate("hostedZone")
    .populate("requests")
    .populate("subscriptions")
    .populate("contacts")
    .exec()

  if (user && user.isCanceled) {
    arrayOfErrors.push({
      path: "identifier",
      message: "This account has been canceled."
    })
  }

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
    ctx.req.session.userId = user._id
  }

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

const getUsers = async (_, args, ctx, info) => {
  console.log("args: ", args)
  const options = {
    lean: true,
    page: args.page,
    limit: 24,
    /* populate: ["owner", "levels"], */
    collation: {
      locale: "en"
    },
    sort: {
      subscriberCount: "desc"
    }
  }

  // we don't need page or cursor in our query
  delete args.page
  var query = {}

  for (var key in args) {
    args[key] !== "" ? (query[key] = args[key]) : null
  }

  // $text search
  /* args.searchInput */
  /*   ? (query = {...query, ...{$text: {$search: args.searchInput}}}) : null */

  /* query = {$"and": searchArr} */

  // fuzzy search on searchInput with regex // shelved because its too slow
  /* input.searchInput */
  /*   ? (query[input.selectionBox] = new RegExp( */
  /*       escapeRegex(input.searchInput), */
  /*       "gi" */
  /*     ))   : null */
  /* {$text: {$search: searchString}} */

  /* delete query.searchInput */
  /* delete query.selectionBox */

  /* end fuzzy search */

  return User.paginate(query, options, function(err, result) {
    return {
      page: result.page,
      users: result.docs,
      more: result.hasNextPage
    }
  })
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

const getNotifications = async (_, __, {req}) => {
  if (!req.session.userId) {
    return null
  }
  const user = await User.findById(req.session.userId)
    .populate("requests")
    .lean()

  return user
}

const getSubscriptions = async (_, args, {user}) => {
  try {
    const subscriptions = await User.findById(userId)

    return {...subscriptions._doc, _id: subscriptions.id}
  } catch (err) {
    throw err
  }
}

const removeSubscription = async (_, args, {req}) => {
  let user = await User.findByIdAndUpdate(
    req.session.userId,
    {
      $pull: {subscriptions: {_id: args.subscribedCourse}}
    },
    {new: true}
  )
    .populate("subscriptions")
    .populate("levels")
    .lean()

  return user
}

const renewConfirmation = async (_, {email}, {redis, url}, info) => {
  try {
    const registeredUser = await User.findOne({email: email}).exec()

    if (registeredUser) {
      const link = await sendReConfirmEmail(
        registeredUser.email,
        await createEmailConfirmLink(url, registeredUser._id, redis)
      )

      if (link) return true
    }

    return false
  } catch (err) {
    return err
  }
}

export const userResolvers = {
  Query: {
    getNotifications,
    getSubscriptions,
    getUserById,
    getUserByToken,
    getUserByUsername,
    getUsers,
    hello: (_, {name}) => `Hello ${name || "World"}`,
    me
  },

  Mutation: {
    addContact,
    acceptContact,
    rejectContact,
    cancelPayMonthly,
    changeCreditCard,
    changePassword,
    confirmEmail,
    contact,
    createPayMonthly,
    forgotPassword,
    removeSubscription,
    renewConfirmation,
    signup,
    login,
    updateMe
  }
}
