import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Box, Section, Text} from '../../components'
import styled from 'styled-components'
import {loadQuestion} from './actions.js'

const Question = styled.div`
`
const Answer = styled.div`
`
class Challenge extends Component {
  render() {
    return (
      <Section>
        <Box>
          <Text fontsize="30px" textalign="center">Challenge: </Text>
          <Question>____is____.</Question>
          <Answer>eg. My car is red.</Answer>
        </Box>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    challengeReducer: state.challengeReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadQuestion
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge)
