import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import styled, {ThemeProvider} from 'styled-components'
import Section from '../containers/Sections/Section.js'
import EventForm from '../containers/Forms/EventForm.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import {addFlashMessage} from '../actions/flashMessages.js'
import * as eventActions from '../containers/Events/actions.js'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  something: state.something
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getSomething: eventActions.getSomething
    },
    dispatch
  )
}

class NewEvent extends Component {
  render() {
    return (
      <Wrapper>
        <Section>
          <EventForm
            addFlashMessage={addFlashMessage}
            history={this.props.history}
          />
        </Section>
        <Section>
          <div>Here it is</div>
          <div>{this.props.getSomething}</div>
        </Section>
      </Wrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent)
