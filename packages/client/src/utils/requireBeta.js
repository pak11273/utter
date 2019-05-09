import React, {PureComponent} from "react"
/* import {cookies} from "brownies" */

const requireBeta = WrappedComponent => {
  class Wrap extends PureComponent {
    componentDidMount = () => {

      var isAuthenticated = false
      if (
        this.props.location.state &&
        this.props.location.state.notification === "therecanonlybeone"
      ) {
        isAuthenticated = true
      }

      if (!isAuthenticated) {
        this.props.history.push("/login", {
          notification: "This page requires a beta access",
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

export default requireBeta
