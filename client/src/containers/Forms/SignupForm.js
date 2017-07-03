import React, {Component} from 'react'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'
import Label from '../../components/Text/Label.js'
import Input from '../../components/Inputs/Input.js'
import Button from '../../components/Buttons/Button.js'
import styled, {ThemeProvider} from 'styled-components'
import {main, base, anotherOne} from '../../themes/config'

const Form = styled.form.attrs({})`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
`

class SignupForm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Form>
        <Title>Join our Community</Title>
        <Subtitle padding="30px">Signup form</Subtitle>
        <Label>Username</Label>
        <Input type="text" name="username" />
        <Label>Password</Label>
        <Input type="password" name="email" />
        <ThemeProvider theme={main}>
          <Button>Submit</Button>
        </ThemeProvider>
      </Form>
    )
  }
}

export default SignupForm
