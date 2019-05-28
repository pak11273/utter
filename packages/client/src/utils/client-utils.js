/* eslint-disable no-plusplus */
import isObject from "lodash/isObject"

export const getValueFromEvent = e => {
  const {target} = e

  let newValues

  if (target) {
    const value = target.type === "checkbox" ? target.checked : target.value
    newValues = {
      [target.name]: value
    }
  } else if (isObject(e)) {
    newValues = e
  }

  return newValues
}

export const noop = () => {}
