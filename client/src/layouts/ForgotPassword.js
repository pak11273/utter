import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Box, Button, Input, Subtitle, Title, Wrapper} from '../components'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {forgotpassword} from '../actions/authActions.js'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.forgotpassword = this.forgotpassword.bind(this)
  }

  forgotpassword() {
    this.props
      .forgotpassword({email: 'pbk11273@gmail.com'})
      .then(res => {
        console.log('res: ', res)
      })
      .catch(err => {
        // this.setState({errors: err.response.data.errors})
        console.log({errors: err.response.data.errors})
      })
  }

  render() {
    return (
      <Wrapper history={this.props.history}>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Reset your password." />
          <meta name="author" content="Isaac Pak" />
          <title>Utter | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <Masthead bg="green">
          <Title>Forgot your password?</Title>
          <Subtitle>
            Enter your email address and we will send you a link to reset your
            password.
          </Subtitle>
          <Box flexdirection="row" margin="20px 0 0 0">
            <Input margin="0 20px 0 20px" />
            <Button onClick={this.forgotpassword} fontsize="20px" padding="6px">
              send
            </Button>
          </Box>
        </Masthead>
      </Wrapper>
    )
  }
}

export default connect(null, {forgotpassword})(ForgotPassword)
