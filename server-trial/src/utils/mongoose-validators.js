const mongoose = require("mongoose")
const validate = require("mongoose-validator")

export const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [8],
    message: "Password should be more than {ARGS[0]} characters"
  }),
  validate({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Password should contain alpha-numeric characters only"
  })
]
