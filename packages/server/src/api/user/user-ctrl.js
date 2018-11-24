import chalk from "chalk"
import {forgotPasswordPrefix} from "../../constants"
import {redis} from "../../redis.js"
import User from "./user-model.js"
import config from "../../config"

export const confirmationEmail = async (req, res) => {
  const {id} = req.params
  console.log("id: ", id)
  try {
    const key = await redis.get(id)
    console.log("key: ", key)
    if (key === null) {
      res
        .status(401)
        .send(
          "Confirmation Error:  You're email confirmation link is invalid or has expired.  Please try signing up again."
        )
    } else {
      User.findByIdAndUpdate(key, {$set: {confirmed: true}}, (err, doc) => {
        if (err) {
          res
            .status(500)
            .send(
              `There was an internal process error.  Please email support about this issue.`
            )
        } else {
          redis.del(id)
          res.status(301).redirect(config.appURL)
        }
      })
    }
  } catch (e) {
    console.log(chalk.bgWhite.black.bold("Error: ", e))
  }
}

export const forgotPasswordEmail = async (req, res) => {
  const passwordId = forgotPasswordPrefix + req.params.id
  try {
    const userId = await redis.get(passwordId)
    if (userId === null) {
      res
        .status(401)
        .send(
          "Confirmation Error:  You're email confirmation link is invalid or has expired.  Please try again."
        )
    } else {
      // TODO: implement this
      // redirect to reset password form
      // reset password
      /* User.findByIdAndUpdate(userId, {$set: {confirmed: true}}, (err, doc) => { */
      /*   if (err) { */
      /*     res */
      /*       .status(500) */
      /*       .send( */
      /*         `There was an internal process error.  Please email support about this issue.` */
      /*       ) */
      /*   } else { */
      /* redis.del(passwordId) */
      res.status(301).redirect(config.appURL)
      /* } */
      /* }) */
    }
  } catch (e) {
    console.log(chalk.bgWhite.black.bold("Error: ", e))
  }
}
