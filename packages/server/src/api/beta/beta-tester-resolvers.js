/* eslint-enable no-unused-vars */
import * as yup from "yup"
import {
  expiredKeyError,
  duplicateEmail,
  duplicateUsername
} from "../shared/error-messages.js"
import {createEmailConfirmLink} from "../../utils/create-confirmation-email-link.js"
import {confirmEmailPrefix} from "../../constants"
import {formatYupError} from "../../utils/format-yup-error.js"
import {
  sendContactEmail,
  sendConfirmEmail,
  sendForgotPasswordEmail
} from "../../mail/mail"
import {userByToken} from "../shared/resolver-functions.js"

import {signupSchema} from "@utterzone/common"

const betaSignup = async (_, args, {redis, url}, info) => {
  console.log("args: ", args)
  try {
    const betaTester = new BetaTester()
    await betaTester.save()

    /* const link = await sendConfirmEmail( */
    /*   newUser.email, */
    /*   await createEmailConfirmLink(url, newUser._id, redis) */
    /* ) */

    if (betaTester) return true
    return false
  } catch (err) {
    throw err
  }
}

export const userResolvers = {
  Query: {},

  Mutation: {
    betaSignup
  }
}
