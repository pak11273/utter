import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {main, base} from '../../../themes/config'
import {validateInput} from '../../../utils/validations/login.js'
import {
  Box,
  Button,
  Input,
  InputLine,
  Label,
  Subtitle
} from '../../../components'

// password reset
// https://www.codementor.io/olatundegaruba/password-reset-using-jwt-ag2pmlck0

// actions
import actions from '../../../api/user/actions.js'

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
const Center = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
const Error = styled.div`
  padding: ${props => props.padding};
  color: red;
`
Error.defaultProps = {
  padding: '45px 0 45px 0'
}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identifier: '',
      password: '',
      url: '',
      loading: false,
      cb: null,
      errors: {}
    }
  }

  componentDidMount() {
    this.props.actions.reset()
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.isValid()) {
      // clear all form errors
      this.setState({
        errors: {} // clears local errors every time we submit form
      })
      this.setState({
        errors: {} // clears store errors every time we submit form
      })

      this.props.actions.login(this.state)
      this.setState({
        errors: this.props.userReducer.errors
      })
      console.log('state: ', this.state)
      // TODO: if user is logged in then
      // this.props.actions.push('/dashboard')
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
    const identifierErrors = this.state.errors.identifier
    const emailErrors = this.state.errors.email
    const passwordErrors = this.state.errors.password
    return (
      <Form onSubmit={this.onSubmit}>
        <Center>
          <Subtitle display="inline" fontsize="1rem">
            Don't have an account. Sign up{' '}
            <NavLink to="/signup">
              <Subtitle
                color="#ffc107"
                fontsize="1rem"
                display="inline"
                padding="0">
                here.
              </Subtitle>
            </NavLink>
          </Subtitle>
          <Label>Username or Email</Label>
          <InputLine
            autocomplete="username"
            onChange={this.onChange}
            value={this.state.identifier}
            type="text"
            name="identifier"
          />
          {this.state.errors.identifier &&
            Object.keys(identifierErrors).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{identifierErrors[value]}</Error>
            })}
          <div>
            {this.props.userReducer.errors.form && (
              <Error>
                &mdash; {this.props.userReducer.errors.form} &mdash;{' '}
              </Error>
            )}
          </div>
          <Label>Password</Label>
          <InputLine
            autocomplete="current-password"
            onChange={this.onChange}
            value={this.state.password}
            type="password"
            name="password"
          />
          {this.state.errors.password &&
            Object.keys(passwordErrors).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{passwordErrors[value]}</Error>
            })}

          <Box justifycontent="row">
            <ThemeProvider theme={main}>
              <Button
                color="black"
                fontsize="1.5rem"
                margin="20px auto"
                padding=".2rem 1rem"
                width="110px">
                Log in
              </Button>
            </ThemeProvider>
            <NavLink to="/forgot-password">
              <Subtitle
                color="#ffc107"
                fontsize="1rem"
                display="inline"
                padding="0">
                Forgot Password?
              </Subtitle>
            </NavLink>
          </Box>
        </Center>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        reset: actions.reset,
        login: actions.loading,
        push: location => {
          dispatch(push(location))
        }
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
