import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Chat, Uttered} from '../../containers'
import {Box, Button, Column, Section, Text, TextArea} from '../../components'

class Friends extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Friends
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'red'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Sponsor
        </Text>
        <div>Joe <span style={{color: 'green'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Sponsorees
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Blocked
        </Text>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
      </div>
    )
  }
}

class ChatPanelContainer extends Component {
  render() {
    return (
      <Router>
        <Column alignitems="flex-start">
          <Box
            flexdirection="row"
            height="100%"
            background="lightblue"
            justifycontent="space-around"
            margin="0 0 20px 0">
            <Link to="/connections/chat" fontsize="1rem">
              Chat
            </Link>
            <Link to="/connections/friends" fontsize="1rem">Friends</Link>
            <Link to="/connections/uttered" fontsize="1rem">Uttered</Link>
          </Box>
          <Box alignitems="flex-start">
            <Route path="/connections/chat" component={Chat} />
            <Route path="/connections/uttered" component={Uttered} />
            <Route path="/connections/friends" component={Friends} />
          </Box>
        </Column>
      </Router>
    )
  }
}

export default connect(null, null)(ChatPanelContainer)
