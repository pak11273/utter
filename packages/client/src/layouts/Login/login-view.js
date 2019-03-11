import React, {PureComponent} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {local} from "brownies"

import LoginForm from "./login-form"
import {addFlashMessage} from "../../core/actions/flashMessages.js"

class Login extends PureComponent {
  componentDidMount() {
    const {notification} = this.props.location.state
    if (notification) {
      toast(notification)
    }
    this.props.history.replace("/login", {notification: null})
  }

  render() {
    const {submit, addFlashMessage} = this.props
    const loggedIn = local.AUTH_TOKEN
    if (loggedIn) {
      var redirect = <Redirect to="/" />
    } else {
      redirect = <LoginForm addFlashMessage={addFlashMessage} submit={submit} />
    }
    return <React.Fragment>{redirect}</React.Fragment>
  }
}

export default connect(
  null,
  {addFlashMessage}
)(Login)
