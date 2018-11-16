/* import Redis from "ioredis" */
import axios from "axios"
import adapter from "axios/lib/adapters/http"
import {createEmailConfirmLink} from "./create-confirmation-email-link.js"
import User from "../api/user/user-model.js"
import config from "../config"

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

describe("Utils Tests", () => {
  it("Ensure confirms user and clears key in redis", async () => {
    try {
      const url = await createEmailConfirmLink(config.host, userId /* redis */)
      const response = await axios.get(url, {adapter})
      expect(response).toHaveProperty("data")
      User.findById(userId, (err, user) => {
        if (err) {
          console.log("err: ", err)
        }
        expect(user.confirmed).toBeTruthy()
      })
      const chunks = url.split("/")
      const key = chunks[chunks.length - 1]
      const val = await redis.get(key)
      expect(val).toBeNull()
    } catch (err) {
      console.log(err)
    }
  })
  it("throws and error if bad key", async () => {
    try {
      const response = await axios.get(`${config.host}/confirm/1234`, {adapter})
    } catch (e) {
      expect(e.response.statusText).toEqual("Unauthorized")
    }
  })
})
