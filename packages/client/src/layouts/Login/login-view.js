import React, {PureComponent} from "react"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {local} from "brownies"
import "./forms.css"

import LoginForm from "./login-form"

class Login extends PureComponent {
  componentDidMount() {
    const {state} = this.props.location
    const {notification} = state
    if (state.notification) {
      toast[state.type || "info"](notification, {
        className: "toasty",
        bodyClassName: "toasty-body",
        hideProgressBar: true
      })
    }
    this.props.history.replace("/login", {notification: null})
  }

  render() {
    const {submit} = this.props
    const loggedIn = local.AUTH_TOKEN
    if (loggedIn) {
      var redirect = <Redirect to="/" />
    } else {
      redirect = <LoginForm submit={submit} />
    }
    return <React.Fragment>{redirect}</React.Fragment>
  }
}

export default Login
