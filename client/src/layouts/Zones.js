import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Section from '../containers/Sections/Section.js'
import Zones from '../components/Zones/Zones.js'
import Comments from '../components/Comments/Comments.js'
import Col from '../components/Columns/Column.js'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import Text from '../components/Text/Text.js'
import Pictures from '../containers/Pictures/Pictures.js'
import Img from '../components/Medias/Img'
import styled from 'styled-components'
import Input from '../components/Inputs/Input.js'
import Box from '../components/Boxes/Box.js'

const Attribution = styled.div`
 font-size: .5rem;
 a {
   font-size: .5rem;
 }
`

class ZoneLayout extends Component {
  render() {
    return (
      <Section
        background="white"
        flexdirection="column"
        flexdirection960="row"
        alignitems="flex-start">
        <Col width="25%">
          <Zones />
        </Col>
        <Col width="50%">
          <Pictures>
            <Box flexdirection="row" justifycontent="space-between">
              <Text color="black" fontsize="2rem">
                Level 1
              </Text>
              <Text color="black" fontsize="2rem">Timer</Text>
            </Box>
            <Attribution>
              Photo courtesy of <a href="">Pixabay.com</a>
            </Attribution>
          </Pictures>
          <Box>
            <Title color="black" fontsize="2rem">
              Name some of the items in the picture above
            </Title>
            <Subtitle fontsize="1.2rem" color="black">
              You can submit as many items as you see, just don't repeat
              yourself
            </Subtitle>
          </Box>
          <Input color="black" textalign="left" width="90%" />
          <Img
            height="80px"
            width="100%"
            src="http://static2.cdn.ubi.com/gamesites/gro/game/beginers-guide/tn_Advancement-ExperienceBar.jpg"
          />

          <div>Everytime you speak a word. you gain 1pt. experience</div>

        </Col>
        <Col height="100%" width960="25%" width="25%">
          <Box height="100%" maxwidth="500px" background="green" margin="20px">
            <Title>Comments: Zone 1</Title>
            <Comments />
          </Box>
        </Col>
      </Section>
    )
  }
}

export default ZoneLayout
