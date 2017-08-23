import React, {Component} from 'react'
import {addFlashMessage} from '../actions/flashMessages.js'
import {connect} from 'react-redux'

export default ComposedComponent => {
  class Authenticate extends Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.props.history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, {addFlashMessage})(Authenticate)
}
