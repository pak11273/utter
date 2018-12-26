import React, {Component} from "react"
import {addFlashMessage} from "../app/actions/flashMessages.js"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {history} from "@utterzone/connector"
/* import {push} from "react-router-redux" */

export default ComposedComponent => {
  class Authenticate extends Component {
    componentDidMount() {
      console.log("this: ", this)
      const isAuthenticated = localStorage.getItem("AUTH_TOKEN")
      if (!isAuthenticated) {
        this.props.actions.addFlashMessage({
          type: "error",
          text: "You need to login to access this page"
        })
        history.push("/login")
      }

      // TODO: implement admin check
      /* if (!admin) { */

      this.props.actions.addFlashMessage({
        type: "error",
        text: "You need to be an admin to access this page"
      })
      history.push("/dashboard")
      /* } */
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      siteAdmin: state.userReducer.login.siteAdmin
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
