import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import {Helmet} from 'react-helmet'
import {Masthead, Navbar} from '../containers'
import {
  Box,
  MastheadTitle,
  MastheadSubtitle,
  Section,
  Wrapper
} from '../components'

// actions
import {contactmail} from '../app/actions/contactmailActions'
import {toggleFooter} from '../app/actions/toggleFooterAction.js'

import ContactForm from '../containers/Forms/ContactForm/ContactForm.js'

class Contact extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {contactmail} = this.props
    return (
      <Wrapper>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Make direct contact with our team through our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <Masthead background="#f3f3f3">
          <Box maxwidth="1024px">
            <MastheadTitle>Contact Us</MastheadTitle>
            <MastheadSubtitle>
              Make direct contact with our team through our contact information
              form. We will do our best to respond in a timely manner. If you
              are a business or educational institution, this would be a good
              place to shoot a short inquiry.
            </MastheadSubtitle>
          </Box>
        </Masthead>
        <Section>
          <ContactForm
            managingDirectorTitle="Founder"
            managingDirector="Isaac Pak"
            managingDirectorPhone="(430) 201 - 3940"
            managingDirectorEmail="pak11273@gmail.com"
            mailingTitle="Tyler, TX"
            address="pending"
            state="pending"
            emailTitle="Company Email"
            email="sales@utter.zone"
            contactmail={contactmail}
          />
        </Section>
      </Wrapper>
    )
  }
}

const actions = {
  contactmail,
  toggleFooter
}

export default connect(
  null,
  actions
)(Contact)
