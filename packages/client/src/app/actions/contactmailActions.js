import axios from "axios"

export function contactmail(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/mail/contactmail",
      data: data,
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    })
  }
}
