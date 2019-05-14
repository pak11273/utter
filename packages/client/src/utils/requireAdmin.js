import React, {Component} from "react"
import {cookies} from "brownies"
import {withApollo} from "react-apollo"
import {ME_QUERY} from "../graphql/queries/user-queries.js"

const requireAdmin = ComposedComponent => {
  class Authenticate extends Component {
    state = {
      me: false
    }

    componentDidMount = async () => {
      const isAuthenticated = cookies._uid
      if (!isAuthenticated) {
        this.props.history.push("/login", {
          notification: "Please login to access this page."
        })
      }

      this.me = await this.props.client.query({
        query: ME_QUERY
      })

      if (!this.me.data.me.roles.includes("uzAdmin")) {
        this.props.history.push("/", {
          notification: "You need to be an admin to access this page",
          type: "warn"
        })
      } else {
        this.setState({
          me: true
        })
      }
    }

    render() {
      let rendered = <div />
      this.state.me ? (rendered = <ComposedComponent {...this.props} />) : null
      return rendered
    }
  }

  return withApollo(Authenticate)
}

export default requireAdmin
