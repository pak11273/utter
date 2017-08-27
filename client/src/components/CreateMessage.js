import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Box, Button, Input} from '../components'

class CreateMessage extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     message: {
  //       username: '',
  //       message: ''
  //     }
  //   }
  //   this.updateMessage = this.updateMessage.bind(this)
  //   this.addMessage = this.addMessage.bind(this)
  // }

  // updateMessage(e) {
  //   e.preventDefault()
  //   const updatedMessage = this.state.message
  //   updatedMessage[e.target.name] = e.target.value
  //   this.setState({
  //     message: updatedMessage
  //   })
  // }

  // addMessage(e) {
  //   this.props.addMessage(this.state.message)
  // }

  render() {
    return <p>Create a Message</p>
  }
}

export default CreateMessage

//       <Input
//         onChange={this.updateMessage}
//         placeholder="username"
//         name="username"
//       />
//       <Input
//         onChange={this.updateMessage}
//         placeholder="message"
//         name="message"
//       />
//       <Button onClick={this.addMessage} height="30px" color="black">
//         Send
//       </Button>
