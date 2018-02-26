import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {validateInput} from '../../../utils/validations/courseCreate.js'
import {addFlashMessage} from '../../../actions/flashMessages.js'
import validator from 'validator'
import cuid from 'cuid'
import data from '../data'
import Teaching from './Teaching.js'
import Using from './Using.js'
import '../styles.css'

import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Input,
  Label,
  Searching,
  Span,
  Tags,
  Text,
  TextArea,
  Title
} from '../../../components'

// images
import transLoader from '../../../assets/images/trans_loader.gif'

// actions
import {toggleFooter} from '../../../actions/toggleFooterAction.js'
import {createCourseRequest, fetchCourseName} from '../actions.js'

class CourseEdit extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
        <h1>edit</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addFlashMessage,
        createCourseRequest,
        fetchCourseName,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseEdit)
)
