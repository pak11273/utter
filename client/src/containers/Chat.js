import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Box, Button, CreateMessage, Input, Message} from '../components'
import superagent from 'superagent'
import {ApiMgr} from '../utils'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }

    this.addMessage = this.addMessage.bind(this)
    // this.updateName = this.updateName.bind(this)
  }

  componentDidMount() {
    superagent
      .get('/api/messages')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }
        const results = res.body.message

        this.setState({
          list: results
        })
      })
  }

  addMessage(message) {
    superagent.post('/api/messages').send(message).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        const updatedList = Object.assign([], this.state.list)
        updatedList.push(res.body)
        this.setState({
          list: updatedList
        })
      }
    })
  }

  updateName(e) {
    e.preventDefault()
    const updatedName = Object.assign({}, this.state.comment)
    updatedName[e.target.name] = e.target.value
    this.setState({
      comment: updatedName
    })
  }

  render() {
    const messageList = this.state.list.map((message, i) => {
      return (
        <li key={i}>
          <Message currentComment={message} />
        </li>
      )
    })

    return (
      <Box>
        <Box overflowy="scroll" overflowx="none" height="500px">
          <ol>
            {messageList}
          </ol>
        </Box>
      </Box>
    )
  }
}

export default Chat
