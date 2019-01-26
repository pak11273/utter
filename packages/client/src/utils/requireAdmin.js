import React, {Component} from "react"
import schema from "../app/schema.js"
import {addFlashMessage} from "../app/actions/flashMessages.js"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {history} from "@utterzone/connector"
/* import {push} from "react-router-redux" */

export default ComposedComponent => {
  class Authenticate extends Component {
    componentDidMount() {
      const isAuthenticated = localStorage.getItem("AUTH_TOKEN")
      if (!isAuthenticated) {
        this.props.actions.addFlashMessage({
          type: "error",
          text: "You need to login to access this page"
        })
        history.push("/login")
      }

      // TODO: implement Can authorize component instead of this naive admin check
      if (!this.props.user.roles.includes("superAdmin")) {
        this.props.actions.addFlashMessage({
          type: "error",
          text: "You need to be an admin to access this page"
        })
        history.push("/dashboard")
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    const session = schema.session(state.apiReducer)
    const {User} = session
    const userObj = User.all().toRefArray()
    var user = userObj[0]

    return {
      user
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
          addFlashMessage
        },
        dispatch
      )
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate)
}
