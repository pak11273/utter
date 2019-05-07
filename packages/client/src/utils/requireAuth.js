import React, {PureComponent} from "react"
import {cookies} from "brownies"

const requireAuth = WrappedComponent => {
  class Wrap extends PureComponent {
    componentDidMount = () => {
      const isAuthenticated = cookies._uid
      if (!isAuthenticated) {
        this.props.history.push("/login", {
          notification: "Please login to access this page.",
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

export default requireAuth
