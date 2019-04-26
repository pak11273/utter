import React, {Component} from "react"
import {cookies, session} from "brownies"

export default ComposedComponent => {
  class Authenticate extends Component {
    componentDidMount() {
      const {user} = session
      const isAuthenticated = cookies._uid
      if (!isAuthenticated) {
        this.props.history.push("/login", {
          notification: "Please login to access this page."
        })
      }

      // TODO: implement Can authorize component instead of this naive admin check
      if (!user.roles.includes("superAdmin")) {
        this.props.history.push("/", {
          notification: "You need to be an admin to access this page",
          type: "warn"
        })
      } else {
        this.props.history.push("/dashboard")
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return Authenticate
}
