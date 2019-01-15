import {CONTACT_LOADING, CONTACT_SUCCESS} from "./types"

export const contactMailSend = () => {
  return {
    type: CONTACT_LOADING
  }
}

export const contactMailReset = () => {
  return {
    type: CONTACT_SUCCESS
  }
}
