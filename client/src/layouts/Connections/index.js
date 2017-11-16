import React, {Component} from 'react'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import superagent from 'superagent'

import {
  Challenge,
  ChatRoom,
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

class Connections extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    superagent
      .get('/api/users/59ba886955d0041e7a4a854a')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }

        let results = res.body

        if (!results) {
          results = []
        } else {
          this.props.actions.loadUserProfile(results)
        }
      })
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
          <ChatRoom />
        </Column>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    roomReducer: state.roomReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadUserProfile
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
