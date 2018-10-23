import React from "react"
import {render} from "react-dom"
import {Container} from "unstated"

type UserState = {
  token: string
}

// if (localStorage.getItem("AUTH_TOKEN")) {
//   const token = localStorage.getItem("AUTH_TOKEN")
//   this.setState({token})
// }

export default class UserContainer extends Container<UserState> {
  state = {
    token: ""
  }

  add(token) {
    this.setState({token})
  }
  delete() {
    this.setState({token: ""})
  }
}
