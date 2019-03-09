import {v4} from "uuid"

export const createEmailConfirmLink = async (url, userId, redis) => {
  const id = v4()
  await redis.set(id, userId, "ex", 60 * 60 * 24)
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "prod"
  ) {
    url = process.env.REACT_APP_CLIENT_URL
  }
  return `${url}/confirm-email/${id}`
}
