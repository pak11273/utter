import React, {Component} from 'react'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'
import Label from '../../components/Text/Label.js'
import Img from '../../components/Medias/Img'
import Input from '../../components/Inputs/Input.js'
import Button from '../../components/Buttons/Button.js'
import styled, {ThemeProvider} from 'styled-components'
import {main, base, anotherOne} from '../../themes/config'
import InputLine from '../../components/Inputs/InputLine.js'
import Timezones from '../../components/Selects/Timezones/Timezones.js'
import {connect} from 'react-redux'
import {userSignupRequest} from '../../actions/signupActions.js'
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

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

const Leftside = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Rightside = styled.div`
`
const Error = styled.div`
  padding-top: 5px;
  color: red;
`

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      mismatch: '',
      timezone: 'Puerto Rico (Atlantic) America/Puerto_Rico',
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

    if (Validator.isEmpty(state.passwordConfirmation)) {
      errors.passwordConfirmation = {message: "can't be blank"}
    }

    if (!Validator.equals(state.password, state.passwordConfirmation)) {
      errors.passwordConfirmation = {message: 'Passwords must match'}
    }

    return {errors, isValid: isEmpty(errors)}
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.isValid()) {
      this.setState({
        mismatch: '',
        errors: {} // clear errors every time we submit form
      })

      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({
          mismatch: 'password and confirmation do no match'
        })
      } else {
        this.props
          .userSignupRequest(this.state)
          .then(() => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'You signed up successfully. Welcome aboard.'
            })
            this.props.history.push('/')
          })
          .catch(error => {
            this.setState({errors: error.response.data.errors})
          })
      }
    }
  }

  render() {
    const usernameErrors = this.state.errors.username
    const emailErrors = this.state.errors.email
    const passwordErrors = this.state.errors.password
    const passwordConfirmationErrors = this.state.errors.passwordConfirmation
    return (
      <Form onSubmit={this.onSubmit}>
        <Leftside>
          <Img
            alt=""
            src="http://www.exposureguide.com/images/concert/concert-photography-4e.jpg"
          />
          <Title>Join our Community</Title>
          <Subtitle>
            Become part of a growing community of avid learners like yourself
          </Subtitle>
        </Leftside>
        <Rightside>
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
          <Label>Email</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.email}
            type="text"
            name="email"
          />
          {this.state.errors.email &&
            Object.keys(emailErrors).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return (
                <Error key={i}>
                  {emailErrors[value]}
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
          <Label>Password Confirmation</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            type="password"
            name="passwordConfirmation"
          />
          {this.state.errors.passwordConfirmation &&
            Object.keys(passwordConfirmationErrors).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return (
                <Error key={i}>
                  {passwordConfirmationErrors[value]}
                </Error>
              )
            })}
          <Error>
            {this.state.mismatch && this.state.mismatch}
          </Error>

          <Label>Timezone</Label>
          <Timezones
            onChange={this.onChange}
            value={this.state.timezone}
            name="timezone"
          />
          <ThemeProvider theme={main}>
            <Button color="black">Join</Button>
          </ThemeProvider>
        </Rightside>
      </Form>
    )
  }
}

export default connect(
  state => {
    return {}
  },
  {userSignupRequest}
)(SignupForm)
