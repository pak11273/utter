import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import superagent from 'superagent'
import _ from 'lodash'

import {
  Challenge,
  ChatPanel,
  Pictures,
  Remote,
  Rooms,
  Speaker
} from '../../containers'

import {
  Box,
  Button,
  Column,
  Img,
  Input,
  Subtitle,
  Section,
  Text,
  Title
} from '../../components'

// actions
import {loadUserProfile} from './actions.js'
import {setAuthor} from '../../containers/ChatPanel/actions.js'
import {addMsg} from '../../containers/Chat/actions.js'
import {socketConnect} from '../../services/socketio/actions.js'

class Connections extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // load the user profile
    const userId = this.props.authReducer.user._id
    this.props.actions.loadUserProfile(userId)
    // if user is logged in then start socket connection
    // if (window.localStorage.jwtToken) {
    //   this.props.actions.socketConnect()
    // } else {
    //   alert(
    //     'Failed to connect to the server. Please report the issue to technical support.'
    //   )
    // }
  }

  render(props) {
    if (
      this.props.channelReducer.channelId === null ||
      this.props.roomReducer.roomTitle.indexOf('Speaker')
    ) {
      var intro = (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <h1>
            Your Ad here
          </h1>
          <p>email sales@utterzone.com</p>
        </div>
      )
    } else {
      var live = (
        <div>
          <Pictures />
          <Challenge />
          <Speaker />
        </div>
      )
    }
    return (
      <Section gridtemplatecolumns=".6fr 2fr 1fr">
        <Column>
          <Remote />
        </Column>
        <Column>
          <Box flexdirection="row" justifycontent="center">
            <Text color="black" fontsize="2rem">
              {this.props.roomReducer.roomTitle}
            </Text>
          </Box>
          {intro}
          {live}
        </Column>
        <Column>
          <ChatPanel />
        </Column>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    roomReducer: state.roomReducer,
    userReducer: state.userReducer,
    authReducer: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setAuthor,
        loadUserProfile,
        socketConnect
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
