import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Box, Button, Input, Subtitle, Title, Wrapper} from '../components'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {addFlashMessage} from '../actions/flashMessages.js'
import {forgotpassword} from '../actions/authActions.js'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null
    }

    this.onChange = this.onChange.bind(this)
    this.forgotpassword = this.forgotpassword.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  forgotpassword() {
    this.props.actions
      .forgotpassword({email: this.state.email})
      .then(res => {
        this.props.actions.addFlashMessage({
          type: 'success',
          text: res.data.message
        })
      })
      .catch(error => {
        console.log('error: ', error.response)
        this.props.actions.addFlashMessage({
          type: 'fail',
          text: error.response.data.message
        })
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
            <Input
              name="email"
              onChange={this.onChange}
              margin="0 20px 0 20px"
            />
            <Button onClick={this.forgotpassword} fontsize="20px" padding="6px">
              send
            </Button>
          </Box>
        </Masthead>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addFlashMessage,
        forgotpassword
      },
      dispatch
    )
  }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)
