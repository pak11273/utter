import {v4} from "uuid"
import {confirmEmailPrefix} from "../constants"

export const createEmailConfirmLink = async (url, userId, redis) => {
  const id = v4()
  await redis.set(`${confirmEmailPrefix}${id}`, userId, "ex", 60 * 60 * 24) // ex = expires
  // should be server ip not frontend??
  /* if (process.env.NODE_ENV === "production") { */
  /*   url = process.env.REACT_APP_CLIENT_URL */
  /* } */
  console.log("ur: ", url)
  console.log("id: ", userId)
  return `${url}/confirm-email/${id}`
}
