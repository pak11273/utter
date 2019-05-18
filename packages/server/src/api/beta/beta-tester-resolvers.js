/* eslint-enable no-unused-vars */
import * as yup from "yup"
import {
  expiredKeyError,
  duplicateEmail,
  duplicateUsername
} from "../shared/error-messages.js"
import {confirmEmailPrefix} from "../../constants"
import {formatYupError} from "../../utils/format-yup-error.js"
import {sendContactEmail, sendForgotPasswordEmail} from "../../mail/mail"
import {userByToken} from "../shared/resolver-functions.js"

import {signupSchema} from "@utterzone/common"
import User from "../user/user-model.js"
import BetaTester from "../beta/beta-tester-model.js"

const betaAccess = async (_, {key}, {redis, url}, info) => {
  console.log("key: ", key)
  try {
    if (key === process.env.BETA_KEY) {
      return "access"
    }
    return "you don't have access"
  } catch (err) {
    throw err
  }
}

const betaSignup = async (_, {input}, {redis, url}, info) => {
  try {
    const betaTester = new BetaTester(input)
    await betaTester.save()
    if (betaTester) return true
    return false
  } catch (err) {
    throw err
  }
}

const getBetaTesters = async (_, args, {req}, __) => {
  if (!req.session.userId) {
    return null
  }
  const user = await User.findById(req.session.userId).lean()
  // get user, if role uzAdmin, return users
  console.log("user: ", user)

  if (user.roles.indexOf("uzAdmin") !== -1) {
    const betaTesters = await BetaTester.find().lean()
    console.log("beta: ", betaTesters)
    return betaTesters
  }
}

export const betaTesterResolvers = {
  Query: {
    betaAccess,
    getBetaTesters
  },

  Mutation: {
    betaSignup
  }
}
