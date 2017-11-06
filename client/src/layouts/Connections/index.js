import React, {Component} from 'react'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import superagent from 'superagent'

import {
  Challenge,
  Chat,
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
      <Section
        background="white"
        flexdirection="column"
        flexdirection960="row"
        alignitems="flex-start">
        <Column width="25%">
          <Remote />
        </Column>
        <Column width="50%">
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
        <Column height="100%" width960="25%" width="25%">
          <Box
            height="100%"
            maxwidth="500px"
            background="green"
            flexdirection="row"
            justifycontent="space-around"
            margin="20px">
            <Link color="black" fontsize="2rem" to="#">Chat</Link>
            <Link color="black" fontsize="2rem" to="#">Private</Link>
            <Link color="black" fontsize="2rem" to="#">Viewers</Link>
          </Box>
          <Chat />
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
