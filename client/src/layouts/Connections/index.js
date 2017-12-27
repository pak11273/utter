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
  RemoteSideBar,
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

// images
import lobbyAdImg from '../../advertisers/clickbank/learnspanishlikecrazy/assets/images/lobby_ad.JPG'

// actions
import {loadUserProfile} from './actions.js'
import {setAuthor} from '../../containers/ChatPanel/actions.js'
import {addMsg} from '../../containers/Chat/actions.js'

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
      this.props.socketReducer.status === 'got a list of rooms' ||
      this.props.socketReducer.joined_room === 'Lobby'
    ) {
      var intro = (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <Text fontsize="30px">
            Learn To Speak Conversational Spanish With Complete Confidence.
          </Text>
          <a
            href="http://984cex1yvs8pird7xbrfc2uocc.hop.clickbank.net/?tid=TEST"
            target="_blank">
            <Img src={lobbyAdImg} />
          </a>
        </div>
      )
    } else if (this.props.roomReducer.creator !== '') {
      var live = (
        <div>
          <Pictures />
          <Challenge />
          <Speaker />
        </div>
      )
    } else {
      var live = (
        <div>
          <Pictures />
        </div>
      )
    }
    return (
      <Section gridtemplatecolumns="20% 40% 40%">
        <Column>
          <RemoteSideBar />
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
    socketReducer: state.socketReducer,
    userReducer: state.userReducer,
    authReducer: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setAuthor,
        loadUserProfile
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
