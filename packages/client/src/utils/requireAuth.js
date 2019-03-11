import React, {PureComponent} from "react"
import {local} from "brownies"

const requireAuth = WrappedComponent => {
  class Wrap extends PureComponent {
    componentDidMount() {}

    render() {
      const isAuthenticated = local.AUTH_TOKEN
      if (!isAuthenticated) {
        this.props.history.push("/login", {
          notification: "You need to login to access this page."
        })
      }
      return <WrappedComponent {...this.props} />
    }
  }

  return Wrap
}

export default requireAuth
