import React, {Component} from 'react'
import {addFlashMessage} from '../actions/flashMessages.js'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'

export default ComposedComponent => {
  class Authenticate extends Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      console.log('history: ', this.props)
      if (!this.props.isAuthenticated) {
        this.props.actions.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.props.actions.pushTo('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.actions.pushTo('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.authReducer.isAuthenticated
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      actions: bindActionCreators(
        {
          addFlashMessage,
          pushTo: location => {
            dispatch(push(location))
          }
        },
        dispatch
      )
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Authenticate))
}
