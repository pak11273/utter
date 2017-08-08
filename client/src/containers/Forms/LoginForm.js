import React, {Component} from 'react'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'
import Label from '../../components/Text/Label.js'
import Img from '../../components/Medias/Img'
import Input from '../../components/Inputs/Input.js'
import Box from '../../components/Boxes/Box.js'
import Button from '../../components/Buttons/Button.js'
import styled, {ThemeProvider} from 'styled-components'
import {main, base} from '../../themes/config'
import InputLine from '../../components/Inputs/InputLine.js'
import Timezones from '../../components/Selects/Timezones/Timezones.js'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../actions/login'

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media(min-width: 640px) {
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
  padding-top: 5px;
  color: red;
`

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      isLoading: false,
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    const {errors, isValid} = this.validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  validateInput(state) {
    let errors = {}

    if (!Validator.isEmail(state.email)) {
      errors.email = {message: 'Email is invalid'}
    }

    if (Validator.isEmpty(state.email)) {
      errors.email = {message: "can't be blank"}
    }

    if (Validator.isEmpty(state.username)) {
      errors.username = {message: "can't be blank"}
    }

    if (Validator.isEmpty(state.password)) {
      errors.password = {message: "can't be blank"}
    }

    return {errors, isValid: isEmpty(errors)}
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      alert('hi')
      // this.setState({
      //   errors: {}, // clear errors every time we submit form
      //   isLoading: true
      // })

      // this.props
      //   .login(this.state)
      //   .then(res => {
      //     this.props.history.push('/')
      //   })
      //   .catch(error => {
      //     this.setState({errors: error.response.data.errors, isLoading: false})
      //   })
    }
  }

  render() {
    const usernameErrors = this.state.errors.username
    const emailErrors = this.state.errors.email
    const passwordErrors = this.state.errors.password
    const passwordConfirmationErrors = this.state.errors.passwordConfirmation
    return (
      <Form onSubmit={this.onSubmit}>
        <Center>
          <Img
            alt=""
            src="http://devfloat.net/wp-content/uploads/2015/10/Freebie-PSD-Signin-Button.jpg"
          />
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
          <Label>Username</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.username}
            type="text"
            name="username"
          />
          {this.state.errors.username &&
            Object.keys(usernameErrors).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return (
                <Error key={i}>
                  {usernameErrors[value]}
                </Error>
              )
            })}
          <Label>Password</Label>
          <InputLine
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
              return (
                <Error key={i}>
                  {passwordErrors[value]}
                </Error>
              )
            })}

          <Box justifycontent="row">
            <ThemeProvider theme={main}>
              <Button
                color="black"
                fontsize="1.5rem"
                margin="43px 56px 39px 41px"
                padding=".2rem 1rem"
                width="110px">
                Log in
              </Button>
            </ThemeProvider>
            <NavLink to="/signup">
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

export default connect(null, {login})(LoginForm)
