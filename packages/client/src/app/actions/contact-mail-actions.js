import axios from "axios"

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
  }
}
