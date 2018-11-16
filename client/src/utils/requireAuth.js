import React, {Component} from "react"
import {addFlashMessage} from "../app/actions/flashMessages.js"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {push} from "react-router-redux"

export default ComposedComponent => {
  class Authenticate extends Component {
    componentDidMount() {
      const isAuthenticated = localStorage.getItem("AUTH_TOKEN")
      if (!isAuthenticated) {
        this.props.addFlashMessage({
          type: "error",
          text: "You need to login to access this page"
        })
        this.props.push("/login")
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.login.isAuthenticated
  })

  const mapDispatchToProps = dispatch => {
    bindActionCreators(
      {
        addFlashMessage,
        push
      },
      dispatch
    )
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate)
}
