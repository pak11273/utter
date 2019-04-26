import React, {Component} from "react"
import {cookies} from "brownies"

const noAuth = WrappedComponent => {
  class Wrap extends Component {
    componentDidMount() {
      const isAuthenticated = cookies._uid
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
