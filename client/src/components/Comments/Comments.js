import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Comment from '../../components/Comments/Comment.js'
import styled from 'styled-components'
import Input from '../../components/Inputs/Input.js'
import Box from '../../components/Boxes/Box.js'
import Button from '../../components/Buttons/Button.js'
import superagent from 'superagent'
import {ApiMgr} from '../../utils'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: [
        {
          body: 'This is going to be a long comment to see what happens?',
          username: 'trump',
          timestamp: '1pm'
        },
        {body: 'comment 2', username: 'barney', timestamp: '2am'},
        {body: 'comment 3', username: 'gerard', timestamp: '3pm'}
      ]
    }

    this.submitComment = this.submitComment.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  componentDidMount() {
    superagent
      .get('/api/comments')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }

        // console.log(res.body)
      })
  }

  submitComment(e) {
    e.preventDefault()
    const updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment)
    this.setState({
      list: updatedList
    })
  }

  updateName(e) {
    e.preventDefault()
    const updatedName = Object.assign({}, this.state.comment)
    updatedName[e.target.name] = e.target.value
    this.setState({
      comment: updatedName
    })
    console.log(this.state.comment)
  }

  render() {
    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}>
          <Comment currentComment={comment} />
        </li>
      )
    })
    return (
      <Box>
        <ol>
          {commentList}
        </ol>
        <Input
          onChange={this.updateName}
          placeholder="username"
          name="username"
        />
        <Input onChange={this.updateName} placeholder="comment" name="body" />
        <Input
          onChange={this.updateName}
          placeholder="timestamp"
          name="timestamp"
        />
        <Button onClick={this.submitComment} height="30px" color="black">
          Send
        </Button>
      </Box>
    )
  }
}

export default Comments
