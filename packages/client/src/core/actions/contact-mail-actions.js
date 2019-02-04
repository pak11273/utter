import axios from "axios"
import {store} from "../../store.js"

// actions
import {addFlashMessage} from "./flashMessages.js"
import {contactMailReset} from "../../layouts/contact/actions.js"

export function contactmail(data) {
  var url = "/mail/contactmail"
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "prod"
  ) {
    url = "https://api.utterzone.com/mail/contactmail"
  }

  return () => {
    console.log("dat: ", data)
    return axios({
      method: "post",
      url,
      data,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        console.log("response: ", response)
        store.dispatch(contactMailReset())
        store.dispatch(
          addFlashMessage({
            type: "success",
            text: response.data.message
          })
        )
      })
      .catch(err => {
        console.log("err: ", err)
        store.dispatch(
          addFlashMessage({
            type: "error",
            text: err
          })
        )
        store.dispatch(contactMailReset())
      })
  }
}
