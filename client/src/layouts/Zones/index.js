import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Helmet} from 'react-helmet'
import _ from 'lodash'

import {
  Challenge,
  ChatPanel,
  KnowledgeBase,
  Pictures,
  RemoteSideBar,
  Rooms,
  Speaker
} from '../../containers'

import {Ad, Box, Column, Section, Text, TextArea} from '../../components'

// ad rotator
import {ad} from '../../services/index.js'

// actions
import {loadUserProfile} from './actions.js'
import {setAuthor} from '../../containers/ChatPanel/actions.js'

class Zones extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // load the user profile
    const userId = this.props.userReducer.login.user._id
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
    // const today = ad.today()
    // const lang = this.props.roomReducer.language
    if (
      this.props.channelReducer.channelId === null ||
      this.props.socketReducer.status === 'got a list of rooms' ||
      this.props.socketReducer.joined_room === 'Lobby'
    ) {
      var intro = <Ad />
    } else if (this.props.roomReducer.creator !== '') {
      var live = (
        <Box>
          <Pictures />
          <Speaker />
          <KnowledgeBase />
        </Box>
      )
    } else {
      var live = (
        <Box>
          <Pictures />
          <Speaker />
          <KnowledgeBase />
        </Box>
      )
    }
    return (
      <Section gridtemplatecolumns="25% 35% 40%">
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Affordable language learning" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Zones</title>
          <link rel="canonical" href="https://utter.zone/courses" />
        </Helmet>
        <Column>
          <RemoteSideBar />
        </Column>
        <Column>
          <Box flexdirection="row" justifycontent="center">
            <Text color="black" fontsize="2rem">
              {this.props.socketReducer.status === 'connected to a namespace' ||
              this.props.socketReducer.status === 'got a list of rooms' ||
              this.props.socketReducer.joined_room === 'Lobby' ? null : (
                <Challenge />
              )}
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
    userReducer: state.userReducer
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zones)
