import React, {Component} from "react"
import {addFlashMessage} from "../app/actions/flashMessages.js"
import {connect} from "react-redux"
import {history} from "@utterzone/connector"

const noAuth = WrappedComponent => {
  class Wrap extends Component {
    componentDidMount() {}

    render() {
      const isNotAuthenticated = localStorage.getItem("AUTH_TOKEN")
      if (isNotAuthenticated) {
        this.props.addFlashMessage({
          type: "error",
          text: "You are already logged in."
        })
        history.push("/")
      }
      return <WrappedComponent {...this.props} />
    }
  }

  const actions = {
    addFlashMessage
  }

  return connect(
    null,
    actions
  )(Wrap)
}

export default noAuth
