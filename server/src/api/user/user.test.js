/* import Redis from "ioredis" */
import {request} from "graphql-request"
import chalk from "chalk"
import mongoose from "mongoose"
import {emailNotLongEnough, passwordNotLongEnough} from "utterzone-common"
import {createEmailConfirmLink} from "../../utils/create-confirm-email-link"
import {duplicateEmail, invalidLogin} from "../shared/error-messages.js"
import User from "./user-model.js"
import config from "../../config"

afterAll(() => {
  // mongoose.connection.db.dropDatabase()
  mongoose.disconnect()
})

let userId = ""
/* const redis = new Redis() */

beforeAll(() => {
  jest.setTimeout(40000)

  let newUser = new User({
    email: "bob@bob.com",
    password: "bobbobbobbob"
  })

  userId = newUser._id

  let signedUser = newUser.save(function(err, doc) {
    if (err) {
      console.log(err)
    }
    return doc
  })
})

const email = "trash@trash.com"
const username = "trash"
const password = "trash"
const newPassword = "878sdf8a8"
const signupMutation = (username, email, password) => `
  mutation {
    signup(input: {username: "${username}", password: "${password}", email: "${email}"}) {
      token
			error {
				path
				message
			}
    }
  }
`
const loginMutation = (username, email, password) => `
  mutation {
    login(identifier: "${username}", password: "${password}") {
      token
			error {
				path
				message
			}
    }
  }
`

const forgotPasswordMutation = (newPassword, key) => `
	mutation {
		forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
		  path
			message
		}
	}
`

try {
  describe("Signup User", async () => {
    it("check for duplicate emails", async () => {
      // register a user
      const response = await request(
        config.host + "/graphql",
        signupMutation(username, email, password)
      )
      expect(response.signup.token).toBeDefined()
      // no duplicate users
      const dupe = await request(
        config.host + "/graphql",
        signupMutation(username, email, password)
      )
      expect(dupe.signup.token).toBeNull()
    })

    it("check for bad emails", async () => {
      // bad emails
      const emailCheck = await request(
        config.host + "/graphql",
        signupMutation("frankie", "x", password)
      )
      expect(emailCheck.signup.token).toBeNull()
      /* expect(emailCheck.signup[0].path).toEqual({ */
      /*   path: "email", */
      /*   message: emailNotLongEnough */
      /* }) */
    })

    it("validate passwords", async () => {
      // bad password
      /* const badPW = await request( */
      /*   config.host + "/graphql", */
      /*   signupMutation("george", "good@good.com", "x") */
      /* ) */
      /* expect(badPW.signup).toHaveLength(1) */
      /* expect(badPW.signup[0].path).toEqual({ */
      /*   path: "password", */
      /*   message: passwordNotLongEnough */
      /* }) */
    })
    // bad password and email

    // TODO: need tests for:
    // * how to use async/await with mongoose
    // * has user been saved to db?
    // * email is email
    // * password is not equal to password
    // * unique values should be unique
    // * test another response for duplicate records
  })

  describe("Login User", async () => {
    it("invalid identifier login", async () => {
      const response = await request(
        config.host + "/graphql",
        loginMutation("someUser", password)
      )
      expect(response.login.error).toEqual([
        {
          path: "identifier",
          message: invalidLogin
        }
      ])
    })

    it("email not confirmed", async () => {
      // pending
    })
  })
  describe("Forgot Password", () => {
    it("ensures it works", async () => {
      const url = await createEmailConfirmLink("", userId /*redis*/)
      const segments = url.split("/")
      const key = segments[segments.length - 1]
      const response = await request(
        config.host + "/graphql",
        forgotPasswordMutation(newPassword, key)
      )
      console.log("res: ", response)
      expect(response).toEqual({
        forgotPasswordChange: null
      })

      // TODO:
      /* const loggedIn = login(email, newPassword) */
      /* console.log("logged: ", loggedIn) */
      /* expect(await loggedIn.toEqual({token})) */
    })
  })
} catch (err) {
  console.log("err: ", err)
}
