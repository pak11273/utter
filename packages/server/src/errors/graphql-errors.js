import {createError} from "apollo-errors"

export const unkownError = createError("unkownError", {
  message: "An unkown error has occurred."
})

export const authorizationError = createError("authorizationError", {
  message: "You are not authorized."
})

export const alreadyAuthentictedError = createError(
  "alreadyAuthentictedError",
  {
    message: "You are already authenticated."
  }
)

export const forbiddenError = createError("forbiddenError", {
  message: "You are not allowed to do that."
})
