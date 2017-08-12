import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Section from '../containers/Sections/Section.js'
import EventForm from '../containers/Forms/EventForm.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import {addFlashMessage} from '../actions/flashMessages.js'

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
      </Wrapper>
    )
  }
}

export default NewEvent
