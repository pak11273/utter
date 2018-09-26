import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import isEmpty from 'lodash/isEmpty'
import styled, {ThemeProvider} from 'styled-components'
import {main, base, anotherOne} from '../../themes/config'
import Timezones from '../../components/Selects/Timezones/Timezones.js'
import {connect} from 'react-redux'
import {
  Box,
  Button,
  Img,
  Input,
  InputLine,
  Label,
  Text,
  Subtitle,
  Title
} from '../../components'
<<<<<<< HEAD
import {FaFacebook} from 'react-icons/fa'
import {FaGoogle} from 'react-icons/fa'
=======
import {FaFacebook, FaGoogle} from 'react-icons/fa'
>>>>>>> origin/master

// actions
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'
import signup from '../../api/user/actions/signupActions.js'
import {validateInput} from '../../utils/validations/user.js'

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

const Leftside = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Rightside = styled.div``
const Error = styled.div`
  padding-top: 5px;
  color: red;
`

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      facebook: '',
      google: '',
      username: '',
      email: '',
      isLoading: null,
      password: '',
      passwordConfirmation: '',
      timezone: 'Puerto Rico (Atlantic) America/Puerto_Rico',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.signupReducer.errors.message
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
      // clear all form errors
      this.setState({
        errors: {}, // clears local errors every time we submit form
        isLoading: true
      })

      this.props.actions.signup(this.state)
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
    var {errors} = this.state
    if (isEmpty(errors)) {
      errors = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
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
          {/* TODO: implement social media oauth
          <Title fontsize="1.5rem">Sign Up with social media</Title>
          <Box flexdirection="row" alignitems="baseline">
            <Box>
              <a href="/auth/facebook">
                <Label>Facebook</Label>
                <FaFacebook
                  style={{
                    fontsize: '1.3rem',
                    verticalalign: 'top',
                    color: 'blue'
                  }}
                />{' '}
              </a>
            </Box>
            <Text>or</Text>
            <Box>
              <a href="/auth/google">
                <Label>Google</Label>
                <FaGoogle
                  style={{
                    fontsize: '1.3rem',
                    verticalalign: 'top',
                    color: 'blue'
                  }}
                />{' '}
              </a>
            </Box>
          </Box>
            */}
          <Title fontsize="1.5rem">With your email</Title>
          <Label>Username</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.username}
            type="text"
            name="username"
          />
          {errors.username &&
            Object.keys(errors.username).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{errors.username[value]}</Error>
            })}
          <Label>Email</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.email}
            type="text"
            name="email"
          />
          {errors.email &&
            Object.keys(errors.email).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{errors.email[value]}</Error>
            })}
          <Label>Password</Label>
          <InputLine
            autoComplete="new-password"
            onChange={this.onChange}
            value={this.state.password}
            type="password"
            name="password"
          />
          {errors.password &&
            Object.keys(errors.password).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{errors.password[value]}</Error>
            })}
          <Label>Password Confirmation</Label>
          <InputLine
            autoComplete="new-password"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            type="password"
            name="passwordConfirmation"
          />
          {errors.passwordConfirmation &&
            Object.keys(errors.passwordConfirmation).map((key, i) => {
              if (key === 'message') {
                var value = key
              }
              return <Error key={i}>{errors.passwordConfirmation[value]}</Error>
            })}
          <Label>Timezone</Label>
          <Timezones
            onChange={this.onChange}
            value={this.state.timezone}
            name="timezone"
          />
          <ThemeProvider theme={main}>
            <Button color="black" fontsize="1.5rem" padding=".2rem 1rem">
              Join
            </Button>
          </ThemeProvider>
        </Rightside>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    signupReducer: state.userReducer.signup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        toggleFooter,
        signup: signup.request,
        push: location => {
          dispatch(push(location))
        }
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm)
