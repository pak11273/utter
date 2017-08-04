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

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmation: '',
      timezone: 'Puerto Rico (Atlantic) America/Puerto_Rico'
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.userSignupRequest(this.state)
  }

  render() {
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
          <Label>Email</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.email}
            type="text"
            name="email"
          />
          <Label>Password</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.password}
            type="text"
            name="password"
          />
          <Label>Password Confirmation</Label>
          <InputLine
            onChange={this.onChange}
            value={this.state.confirmation}
            type="text"
            name="confirmation"
          />
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

export default SignupForm
