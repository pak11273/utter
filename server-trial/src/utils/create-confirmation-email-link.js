import {v4} from "uuid"

export const createEmailConfirmLink = async (url, userId, redis) => {
  const id = v4()
  await redis.set(id, userId, "ex", 60 * 60 * 24)
  return `${url}/api/users/confirm/${id}`
}
