import React, {Component} from 'react'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'
import Img from '../../components/Medias/Img'
import Label from '../../components/Text/Label.js'
import InputLine from '../../components/Inputs/InputLine.js'
import Box from '../../components/Boxes/Box.js'
import Button from '../../components/Buttons/Button.js'
import styled, {ThemeProvider} from 'styled-components'
import {main, base} from '../../themes/config'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/eventActions.js'

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
  justify-content: center;
  margin: 0 auto;
`
const Error = styled.div`
  padding-top: ${props => props.paddingtop};
  color: red;
`
Error.defaultProps = {
  paddingtop: '5px'
}

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      isLoading: false,
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

  onSubmit(e) {
    e.preventDefault()
    this.props.createEvent(this.state)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Center>
          <Img
            alt=""
            src="http://www.liberty.edu/media/1414/events/Events%20Banner.jpg"
          />
          <Label>Create an Event</Label>
          <InputLine
            margin="0 auto"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <Box justifycontent="center">
            <ThemeProvider theme={main}>
              <Button
                color="black"
                fontsize="1.5rem"
                margin="43px 56px 39px 41px"
                padding=".2rem 1rem"
                width="110px">
                Create
              </Button>
            </ThemeProvider>
          </Box>
        </Center>
      </Form>
    )
  }
}

export default connect(null, {createEvent})(EventForm)
