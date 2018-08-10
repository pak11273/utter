import React, {Component} from 'react'
import {
  Box,
  Column,
  Grid,
  InputLine,
  Label,
  Row,
  Section,
  Title,
  Subtitle,
  Wrapper
} from '../../../components'
import Button from '../../../components/Buttons/Button.js'
import styled, {ThemeProvider} from 'styled-components'
import {main, base, anotherOne} from '../../../themes/config'
import Select from 'react-select'
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber'
import CallingCodes from '../../../assets/js/CallingCodes.js'
import './select.css'
import FaQuestion from 'react-icons/fa/question-circle-o'
import FaEmail from 'react-icons/fa/envelope-o'
import FaReply from 'react-icons/fa/mail-reply-all'
import FaPhone from 'react-icons/fa/phone'
import FaUser from 'react-icons/fa/user'

const Role = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  text-shadow: ${props => props.textshadow};
`

Role.defaultProps = {
  color: 'blue',
  fontsize: '2rem',
  fontweight: '600',
  padding: '0 0 20px 0',
  textalign: 'left',
  textshadow: '0 0 0 0'
}

const Phone = styled.div`
  align-items: baseline;
  display: flex;
  width: 100%;
`
const Message = styled.div`
  font-weight: bold;
  color: brown;
`
const Form = styled.form`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.flexdirection};
  height: ${props => props.height};
  justify-content: center;
  overflow: hidden;
  position: ${props => props.position};
  width: ${props => props.width};

  @media (min-width: 768px) {
    display: flex;
    flex-direction: ${props => props.flexdirection768};
    justify-content: center;
  }
`
Form.defaultProps = {
  flexdirection: 'column',
  position: 'relative',
  width: '100%'
}

const Rightside = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height};
  justify-content: space-between;
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};

  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`
Rightside.defaultProps = {
  padding: '0 0 5rem 0',
  position: 'relative',
  width: '50%'
}

const MsgBox = styled.textarea`
  height: ${props => props.height};
  margin: 0 auto;
  width: ${props => props.width};
`
MsgBox.defaultProps = {
  height: '300px',
  width: '100%'
}

const Closing = styled.div`
  color: ${props => props.color};
  text-align: right;
  margin-right: 130px;
`
Closing.defaultProps = {
  color: props => props.theme.color
}

const Signature = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  margin-right: 50px;
  text-align: right;
`
Signature.defaultProps = {
  color: props => props.theme.color,
  fontsize: '1rem'
}

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      number: '',
      country: '',
      subject: '',
      letter: '',
      message: '',
      timezone: 'Puerto Rico (Atlantic) America/Puerto_Rico'
    }
  }

  onChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
    if (e.target.name === 'number') {
      this.validatePhoneNumber('+' + this.state.country + ' ' + e.target.value)
    }
  }

  onSelect2 = cntrObj => {
    this.setState({
      country: cntrObj.value
    })
    this.validatePhoneNumber('+' + cntrObj.value + ' ' + this.state.number)
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.contactmail(this.state)
  }

  getValidNumber(phoneNumber) {
    const phoneUtil = PhoneNumberUtil.getInstance()
    const parsedNumber = phoneUtil.parse(phoneNumber)
    return phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL)
  }

  validatePhoneNumber = phoneNumber => {
    /*
     *     Phone number validation using google-libphonenumber
     *         */
    let valid = false
    try {
      const phoneUtil = PhoneNumberUtil.getInstance()
      valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber))
    } catch (e) {
      valid = false
    }
    if (valid) {
      this.setState({
        message:
          'Phone number ' + this.getValidNumber(phoneNumber) + ' is valid',
        color: 'green'
      })
    } else {
      this.setState({
        message: 'Phone number ' + phoneNumber + ' is not valid',
        color: 'red'
      })
    }
  }

  render(props) {
    return (
      <ThemeProvider theme={base}>
        <Form onSubmit={this.onSubmit}>
          <Section margin="100px 0 0 0" padding="20px" maxwidth="1024px">
            <Role
              color="#273e63"
              fontsize="2.5rem"
              padding="0"
              textalign="left">
              Request Information
            </Role>
            <Box
              alignitems="baseline"
              flexdirection="row"
              justifycontent="flex-start">
              <Label textalign="left" fontsize="1.5rem" width="130px">
                Name
              </Label>
              <InputLine
                textalign="left"
                onChange={this.onChange}
                value={this.state.name}
                type="text"
                name="name"
              />
            </Box>
            <Box
              alignitems="baseline"
              flexdirection="row"
              justifycontent="flex-start">
              <Label textalign="left" fontsize="1.5rem" width="130px">
                Email{' '}
              </Label>
              <InputLine
                textalign="left"
                onChange={this.onChange}
                value={this.state.email}
                type="text"
                name="email"
              />
            </Box>
            <Phone>
              <Label textalign="left" fontsize="1.5rem" width="130px">
                Phone
              </Label>
              <Select
                clearable={false}
                name="country"
                autosize={true}
                placeholder="country name"
                value={this.state.country}
                onChange={this.onSelect2}
                options={CallingCodes}
                labelKey="country"
                valueKey="value"
                valueRenderer={country => country.value}
              />
              <InputLine
                textalign="left"
                onChange={this.onChange}
                value={this.state.number}
                type="text"
                name="number"
              />
            </Phone>
            <Box
              alignitems="baseline"
              flexdirection="row"
              justifycontent="flex-start">
              <div
                className="message"
                style={{
                  color: this.state.color,
                  margin: '0 0 0 50px'
                }}>
                {this.state.message}
              </div>
            </Box>
            <Box
              alignitems="baseline"
              flexdirection="row"
              justifycontent="flex-start">
              <Label textalign="left" fontsize="1.5rem" width="140px">
                Subject{' '}
              </Label>
              <InputLine
                textalign="left"
                onChange={this.onChange}
                value={this.state.subject}
                type="text"
                name="subject"
              />
            </Box>
            <Box alignitems="flex-start" padding="50px" margin="0 0 100px 0">
              <Box margin="40px 0 0 0">
                <Label margin="0 0 20px 0" textalign="left" fontsize="1.5rem">
                  Message
                </Label>
              </Box>
              <MsgBox
                height="180px"
                onChange={this.onChange}
                value={this.state.letter}
                type="text"
                name="letter"
              />
              <ThemeProvider theme={main}>
                <Button
                  alignself="flex-end"
                  bottom="-60px"
                  fontsize="1.5rem"
                  right="-6px"
                  color="black"
                  margin="80px 0 0 0"
                  width="100px">
                  Send
                </Button>
              </ThemeProvider>
            </Box>
            {/* missing section below */}
            {/* <Section>
              <Title
                color="#273e63"
                fontsize="2.5rem"
                margin="70px 0 0 20px"
                textalign="left">
                If the form above isn't working for some reason please use the
                information below for
                inquiries.{' '}
              </Title>
              <Grid gridtemplatecolumns="1fr 1fr 1fr" margin="100px 0 0 0">
                <Title
                  color="#333"
                  padding="0 0 10px 0"
                  textalign="left"
                  fontsize="1.3rem">
                  <FaUser
                    style={{
                      fontsize: '1.3rem',
                      verticalalign: 'top',
                      color: 'blue'
                    }}
                  />{' '}
                  {this.props.managingDirector}
                </Title>
                <Title
                  color="#333"
                  padding="0 0 10px 0"
                  textalign="left"
                  fontsize="1.3rem">
                  <FaPhone
                    style={{
                      fontsize: '1.3rem',
                      verticalalign: 'top',
                      color: 'blue'
                    }}
                  />{' '}
                  {this.props.managingDirectorPhone}
                </Title>
                <Title
                  color="#333"
                  padding="0 0 10px 0"
                  textalign="left"
                  fontsize="1.3rem">
                  <FaEmail style={{verticalAlign: 'top', color: 'blue'}} />{' '}
                  <a
                    href={`mailto:${this.props.managingDirectorEmail}`}
                    style={{color: '#227fab'}}>
                    {this.props.managingDirectorEmail}
                  </a>
                </Title>
                <Subtitle fontsize="1.5rem" textalign="left">
                  {this.props.mailingTitle}
                </Subtitle>
                <Subtitle fontsize="1.5rem" textalign="left">
                  {this.props.address}
                </Subtitle>
                <Subtitle fontsize="1.5rem" textalign="left">
                  {this.props.state}
                </Subtitle>
                <Title
                  color="#333"
                  padding="50px 0 10px 0"
                  textalign="left"
                  fontsize="1.3rem">
                  <FaReply style={{verticalAlign: 'top', color: 'blue'}} />{' '}
                  {this.props.emailTitle}
                </Title>
                <a
                  href={`mailto:${this.props.email}`}
                  style={{color: '#227fab'}}>
                  {this.props.email}
                </a>
              </Grid>
            </Section>*/}
          </Section>
        </Form>
      </ThemeProvider>
    )
  }
}

export default ContactForm
