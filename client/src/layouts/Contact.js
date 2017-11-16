import React, {Component} from 'react'
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
import {connect} from 'react-redux'
import {sendmail} from '../actions/sendmailActions'
import ContactForm from '../containers/Forms/ContactForm/ContactForm.js'

class Contact extends Component {
  render() {
    const {sendmail} = this.props
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
            content="Make direct contact with our team throught our contact information form.  We will get respond in a timely manner.  If you are a business or educational institution, this would be a good place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utter | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <Masthead background="black" padding="20px">
          <Box maxwidth="1024px">
            <MastheadTitle>
              Contact Us
            </MastheadTitle>
            <MastheadSubtitle>
              Make direct contact with our team throught our contact information
              form. We will get respond in a timely manner. If you are a
              business or educational institution, this would be a good place to
              shoot a short inquiry.
              Hello World
            </MastheadSubtitle>
          </Box>
        </Masthead>
        <Section>
          <ContactForm sendmail={sendmail} />
        </Section>
      </Wrapper>
    )
  }
}

export default connect(null, {sendmail})(Contact)
