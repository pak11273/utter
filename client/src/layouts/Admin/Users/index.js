import React, {Component} from 'react'
import {Container} from '../../../containers'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {
  Box,
  Button,
  Column,
  Grid,
  Input,
  Label,
  Line,
  Section,
  Select,
  Text,
  Title
} from '../../../components'

import actionCreators from './actions.js'

class Users extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>under construction</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  // let updateWord = actionCreators.update
  return {
    actions: bindActionCreators(
      {
        // updateWord
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
