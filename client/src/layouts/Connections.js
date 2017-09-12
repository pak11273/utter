import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {Chat, Pictures, Rooms, Speaker} from '../containers'
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
} from '../components'

class Experience extends Component {
  render() {
    return (
      <Box>
        <Box flexdirection="row" justifycontent="space-aroudn">
          <Text>Sort By: </Text>
          <select>
            <option>Room</option>
            <option>Self</option>
          </select>
        </Box>
        <Box flexdirection="row" justifycontent="space-aroudn">
          <Text>Sort By: </Text>
          <select>
            <option>words</option>
            <option>uttered</option>
          </select>
          <select>
            <option>Asc</option>
            <option>Desc</option>
          </select>
        </Box>
        <Box color="black" fontsize="1rem">
          <ol>
            <li>one: 2</li>
            <li>baby: 4</li>
            <li>hat: 30</li>
          </ol>
        </Box>
      </Box>
    )
  }
}

class Misc extends Component {
  render() {
    return <div>Misc</div>
  }
}

class Connections extends Component {
  constructor() {
    super()
    this.state = {
      author: '',
      message: ''
    }

    this.sendToConnection = this.sendToConnection.bind(this)
  }

  sendToConnection(dataFromSpeaker) {
    const {author, message} = dataFromSpeaker
    this.setState({
      author,
      message
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
              <Link to="/experienceTab" fontsize="1rem">Experience</Link>
              <Link to="/miscTab" fontsize="1rem">Misc</Link>
            </Box>
            <Route path="/roomsTab" component={Rooms} />
            <Route path="/experienceTab" component={Experience} />
            <Route path="/miscTab" component={Misc} />
          </Column>
          <Column width="50%">
            <Pictures>
              <Box flexdirection="row" justifycontent="space-between">
                <Text color="black" fontsize="2rem">
                  Level 1
                </Text>
                <Text color="black" fontsize="2rem">Timer</Text>
              </Box>
            </Pictures>
            <Box>
              <Title color="black" fontsize="1.5rem">
                Describe the picture with words you know
              </Title>
              <Subtitle fontsize="1rem" color="black">
                You can send as many times as you want, just don't repeat
                yourself
              </Subtitle>
            </Box>
            <Speaker sendToConnection={this.sendToConnection} />
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

export default Connections
