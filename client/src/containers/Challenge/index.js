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
    let question = null
    if (this.props.roomReducer.listType === 'ads') {
      question = null
    } else {
      question = (
        <Box>
          <Text fontsize="1.5rem" textalign="center">Challenge: </Text>
          <Question>Describe the picture below</Question>
        </Box>
      )
    }
    return (
      <Section>
        {question}
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    challengeReducer: state.challengeReducer,
    roomReducer: state.roomReducer
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
