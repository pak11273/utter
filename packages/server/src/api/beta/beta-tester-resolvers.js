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
import BetaTester from "../beta/beta-tester-model.js"

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

export const betaTesterResolvers = {
  Query: {},

  Mutation: {
    betaSignup
  }
}
