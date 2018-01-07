import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Box, Section, Text} from '../../components'
import styled from 'styled-components'

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
          <Question>{this.props.pictureReducer.question}</Question>
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
    roomReducer: state.roomReducer,
    pictureReducer: state.pictureReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge)
