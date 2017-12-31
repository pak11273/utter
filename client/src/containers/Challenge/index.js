import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Box, Section, Text} from '../../components'
import styled from 'styled-components'
import {loadQuestion} from './actions.js'

const Question = styled.div`
`
class Challenge extends Component {
  render() {
    return (
      <Section>
        <Box>
          <Text fontsize="1.5rem" textalign="center">Challenge: </Text>
          <Question>Describe the picture below</Question>
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
