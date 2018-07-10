import React, {Component} from 'react'
import {addFlashMessage} from '../app/actions/flashMessages.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'

export default ComposedComponent => {
  class Authenticate extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.actions.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.props.actions.push('/login')
      }
      if (!this.props.siteAdmin) {
        this.props.actions.addFlashMessage({
          type: 'error',
          text: 'You need to be an admin to access this page'
        })
        this.props.actions.push('/dashboard')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      siteAdmin: state.userReducer.login.siteAdmin,
      isAuthenticated: state.userReducer.login.isAuthenticated
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
          addFlashMessage,
          push
        },
        dispatch
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate)
}
