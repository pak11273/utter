import {v4} from "uuid"
import {forgotPasswordPrefix} from "../constants"

export const createForgotPasswordLink = async (url, userId, redis) => {
  const id = v4()
  await redis.set(`${forgotPasswordPrefix}${id}`, userId, "ex", 60 * 20) // 20 mins
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "prod"
  ) {
    url = process.env.APP_URL
  }
  return `${url}/change-password/${id}`
}
