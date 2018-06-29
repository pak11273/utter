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
      if (!this.props.isAdmin) {
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
      isAdmin: state.userReducer.isAdmin
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
