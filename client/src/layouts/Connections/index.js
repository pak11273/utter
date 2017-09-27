import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import superagent from 'superagent'

import {Chat, Pictures, Rooms, Speaker, Uttered} from '../../containers'

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

class Misc extends Component {
  render() {
    return <div>Misc</div>
  }
}

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
      <Router>
        <Section
          background="white"
          flexdirection="column"
          flexdirection960="row"
          alignitems="flex-start">
          <Column width="25%">
            <Box
              flexdirection="row"
              height="100%"
              maxwidth="500px"
              background="lightblue"
              justifycontent="space-around"
              margin="20px"
              width="100%">
              <Link to="/roomsTab" fontsize="1rem">Rooms</Link>
              <Link to="/utteredTab" fontsize="1rem">Uttered</Link>
              <Link to="/miscTab" fontsize="1rem">Misc</Link>
            </Box>
            <Route path="/roomsTab" component={Rooms} />
            <Route path="/utteredTab" component={Uttered} />
            <Route path="/miscTab" component={Misc} />
          </Column>
          <Column width="50%">
            <Pictures>
              <Box flexdirection="row" justifycontent="center">
                <Text color="black" fontsize="2rem">
                  Room Level: {this.props.roomReducer.roomLevel}
                </Text>
              </Box>
            </Pictures>
            <Box>
              <Title color="black" fontsize="1.5rem">
                Describe the picture{' '}
              </Title>
            </Box>
            <Speaker />
            <div>Everytime you speak a word. you gain 1pt. experience</div>

          </Column>
          <Column height="100%" width960="25%" width="25%">
            <Box
              height="100%"
              maxwidth="500px"
              background="green"
              margin="20px">
              <Title fontsize="2rem">Live Chat</Title>
            </Box>
            <Chat />
          </Column>
        </Section>
      </Router>
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
