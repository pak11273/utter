import {v4} from "uuid"
import {confirmEmailPrefix} from "../constants"

export const createEmailConfirmLink = async (url, userId, redis) => {
  const id = v4()
  await redis.set(`${confirmEmailPrefix}${id}`, userId, "ex", 60 * 60 * 24) // ex = expires
  return `${url}/confirm-email/${id}`
}
