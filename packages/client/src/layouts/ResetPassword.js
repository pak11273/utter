import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {validateInput} from '../utils/validations/resetPassword.js'
import {
  Box,
  Button,
  Input,
  Label,
  Subtitle,
  Title,
  Wrapper
} from '../components'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {addFlashMessage} from '../app/actions/flashMessages.js'
import {resetpassword} from '../api/user/actions/loginActions.js'

// actions
import login from '../api/user/actions/loginActions.js'

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 640px) {
    flex-direction: row;
    width: 960px;
  }
`
const Error = styled.div`
  padding-top: 5px;
  color: red;
`
class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identifier: '',
      password: '',
      passwordConfirmation: '',
      token: '',
      errors: {}
    }
  }

  componentDidMount() {
    // get reset password token
    const promise = new Promise((resolve, reject) => {
      const query = new URLSearchParams(this.props.location.search)
      const token = query.get('token')
      const user = query.get('user')
      const creds = {user, token}
      resolve(creds)
    })
      .then(result => {
        this.setState({
          identifier: result.user,
          token: result.token
        })
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    if (this.isValid()) {
      this.setState({
        isLoading: true,
        errors: {} // clear errors every time we submit form
      })
      this.props.actions
        .resetpassword(this.state)
        .then(res => {
          this.props.actions.addFlashMessage({
            type: 'success',
            // text: "You have successfully reset your password."
            text: res.data.message
          })
          this.props.history.push('/')
        })
        .then(() => {
          const {identifier, password} = this.state
          const loginState = {
            identifier,
            password
          }
          console.log('loginState: ', loginState)
          this.props.actions.login(loginState)
        })
        .catch(error => {
          console.log('errors: ', error)
          // this.setState({errors: error.response.data.message})
          this.props.actions.addFlashMessage({
            type: 'fail',
            text: error.response.data.message
          })
        })
    }
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  render() {
    const passwordErrors = this.state.errors.password
    const passwordConfirmationErrors = this.state.errors.passwordConfirmation
    return (
      <Wrapper history={this.props.history}>
        <Form onSubmit={this.onSubmit}>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="Reset your password." />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Contacts</title>
            <link rel="canonical" href="https://utter.zone/contact" />
          </Helmet>
          <Masthead bg="green">
            <Title>Enter your new password</Title>
            <Subtitle>
              Passwords should be at least 10 characters, include at least 3 of
              the following 4 types of characters: a lower-case letter, an
              upper-case letter, a number, a special character (e.g. !@#$%^&*).
              They should not have more than 2 identical characters in a row
              (e.g. 111 is not allowed) and not more than 128 characters.
            </Subtitle>
            <Box flexdirection="row" margin="20px 0 0 0">
              <Label margin="0" padding="0" width="180px">
                New Password
              </Label>
              <Box>
                <Input
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  margin="0 20px 0 20px"
                />
                {this.state.errors.password &&
                  Object.keys(passwordErrors).map((key, i) => {
                    if (key === 'message') {
                      var value = key
                    }
                    return <Error key={i}>{passwordErrors[value]}</Error>
                  })}
              </Box>
              <Label margin="0" padding="0" width="180px">
                Confirm Password
              </Label>
              <Box>
                <Input
                  autoComplete="new-password"
                  type="password"
                  name="passwordConfirmation"
                  onChange={this.onChange}
                  margin="0 20px 0 20px"
                />
                {this.state.errors.passwordConfirmation &&
                  Object.keys(passwordConfirmationErrors).map((key, i) => {
                    if (key === 'message') {
                      var value = key
                    }
                    return (
                      <Error key={i}>{passwordConfirmationErrors[value]}</Error>
                    )
                  })}
              </Box>
              <Button fontsize="20px" padding="6px">
                send
              </Button>
            </Box>
            <Box />
          </Masthead>
        </Form>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addFlashMessage,
        login: login.request,
        resetpassword
      },
      dispatch
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ResetPassword)
