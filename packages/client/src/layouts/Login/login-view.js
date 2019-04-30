import React, {PureComponent} from "react"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {cookies} from "brownies"
import "./forms.css"

import LoginForm from "./login-form"

class Login extends PureComponent {
  componentDidMount() {
    // notify user auth warning
    if (this.props && this.props.location) {
      const {state} = this.props.location
      if (state) {
        const {notification} = state
        if (notification) {
          toast[state.type || "info"](notification, {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        }
      }
      this.props.history.replace("/login", {notification: null})
    }
  }

  render() {
    const loggedIn = cookies._uid
    if (loggedIn) {
      var redirect = <Redirect to="/" />
    } else {
      redirect = <LoginForm />
    }
    return <React.Fragment>{redirect}</React.Fragment>
  }
}

export default Login
