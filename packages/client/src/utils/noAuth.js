import React, {Component} from "react"
import {local} from "brownies"

const noAuth = WrappedComponent => {
  class Wrap extends Component {
    componentDidMount() {
      const isAuthenticated = local.AUTH_TOKEN
      if (isAuthenticated) {
        this.props.history.push("/", {
          notification: "You are already logged in.",
          type: "warn"
        })
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return Wrap
}

export default noAuth
