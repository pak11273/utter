import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {NavLink} from "react-router-dom"
import {withRouter} from "react-router"
import styled, {ThemeProvider} from "styled-components"
import {Mutation, graphql} from "react-apollo"
import gql from "graphql-tag"

import {main, base} from "../../../themes/config"
import {validateInput} from "../../../utils/validations/login.js"
import {AUTH_TOKEN} from "./constants"

import {
  Box,
  Button,
  Input,
  InputLine,
  Label,
  Subtitle
} from "../../../components"

// password reset
// https://www.codementor.io/olatundegaruba/password-reset-using-jwt-ag2pmlck0

// actions
import actions from "../../../api/user/actions/login-actions"

const LOGIN_MUTATION = gql`
  mutation LoginMutation($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
    }
  }
`
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
  padding: "45px 0 45px 0"
}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      identifier: "",
      password: "",
      url: "",
      loading: false,
      cb: null,
      errors: {}
    }
  }

  _confirm = async data => {
    if (data) {
      const {token} = data.login
      this._saveUserData(token)
      this.props.history.push(`/dashboard`)
    }
  }

  _loadError = async error => {
    const refinedErrorMsg = error.message.replace("GraphQL error:", "")
    this.setState({
      errors: {
        message: refinedErrorMsg
      }
    })
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
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

      this._confirm()
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
    const {identifier, password} = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Center>
          <Subtitle display="inline" fontsize="1rem">
            Don't have an account. Sign up{" "}
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
              if (key === "message") {
                var value = key
              }
              return (
                <Error key={i} padding="0 0 45px 0">
                  {identifierErrors[value]}
                </Error>
              )
            })}
          <div>
            {this.state.errors.message && (
              <Error>&mdash; {this.state.errors.message} &mdash; </Error>
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
              if (key === "message") {
                var value = key
              }
              return (
                <Error key={i} padding="0 0 45px 0">
                  {passwordErrors[value]}
                </Error>
              )
            })}

          <Box justifycontent="row">
            <ThemeProvider theme={main}>
              <Mutation
                mutation={LOGIN_MUTATION}
                variables={{identifier, password}}
                onCompleted={data => this._confirm(data)}
                onError={error => this._loadError(error)}>
                {mutation => (
                  <Button
                    color="black"
                    fontsize="1.5rem"
                    margin="20px auto"
                    padding=".2rem 1rem"
                    width="110px"
                    onClick={mutation}>
                    Log in
                  </Button>
                )}
              </Mutation>
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        reset: actions.reset,
        login: actions.request
      },
      dispatch
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginForm))
