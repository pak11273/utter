import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Chat} from '../../containers'
import {Box, Column, Section, Text} from '../../components'

class Private extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Pending{' '}
        </Text>
      </div>
    )
  }
}

class Viewers extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Members{' '}
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'red'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Spectators{' '}
        </Text>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
      </div>
    )
  }
}

class ChatRoom extends Component {
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
            <Link to="/connections/private" fontsize="1rem">Private</Link>
            <Link to="/connections/viewers" fontsize="1rem">Viewers</Link>
          </Box>
          <Box alignitems="flex-start">
            <Route path="/connections/chat" component={Chat} />
            <Route path="/connections/private" component={Private} />
            <Route path="/connections/viewers" component={Viewers} />
          </Box>
        </Column>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {channelReducer: state.channelReducer}
}

export default connect(mapStateToProps, null)(ChatRoom)
