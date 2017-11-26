import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import superagent from 'superagent'

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

class Connections extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // load the user profile
    const userId = this.props.authReducer.user._id
    this.props.actions.loadUserProfile(userId)
  }

  render(props) {
    return (
      <Section gridtemplatecolumns=".6fr 2fr 1fr">
        <Column>
          <Remote />
        </Column>
        <Column>
          <Pictures>
            <Box flexdirection="row" justifycontent="center">
              <Text color="black" fontsize="2rem">
                Room Level: {this.props.roomReducer.roomLevel}
              </Text>
            </Box>
          </Pictures>
          <Challenge />
          <Speaker />
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
        loadUserProfile
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
