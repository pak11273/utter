import axios from "axios"
import {toast} from "react-toastify"

export function contactmail(data) {
  var url = "/mail/contactmail"
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "prod"
  ) {
    url = "https://api.utterzone.com/mail/contactmail"
  }

  return () => {
    return axios({
      method: "post",
      url,
      data,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        console.log("RESPONSE: ", response)
        toast.success(response.data.message, {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      })
      .catch(err => {
        console.log("err: ", err)
        toast.error(err, {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      })
  }
}
