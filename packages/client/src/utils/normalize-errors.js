/* eslint-disable */

export const normalizeErrors = errors => {
  const errorMap = {}
  errors.forEach(err => {
    errorMap[err.path] = err.message
  })

  return errorMap
}
