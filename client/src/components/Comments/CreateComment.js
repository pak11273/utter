import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Input from '../../components/Inputs/Input.js'
import Box from '../../components/Boxes/Box.js'
import Button from '../../components/Buttons/Button.js'

class CreateComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: {
        username: '',
        message: ''
      }
    }
  }

  addComment = e => {
    this.props.addComment(this.state.comment)
  };

  updateComment = e => {
    e.preventDefault()
    const updatedComment = this.state.comment
    updatedComment[e.target.name] = e.target.value
    this.setState({
      comment: updatedComment
    })
  };

  render(props) {
    return (
      <Box>
        <p>Create a Comment</p>
        <Input
          onChange={this.updateComment}
          placeholder="username"
          name="username"
        />
        <Input
          onChange={this.updateComment}
          placeholder="comment"
          name="message"
        />
        <Button onClick={this.addComment} height="30px" color="black">
          Send
        </Button>
      </Box>
    )
  }
}

export default CreateComment
