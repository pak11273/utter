import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Masthead} from '../containers'
import {
  Box,
  ButtonCta,
  Column,
  Img,
  Line,
  MastheadTitle,
  MastheadSubtitle,
  Section,
  Subtitle,
  Text,
  Title,
  Wrapper
} from '../components'

// images
import busyPeopleImg from '../assets/images/busy-people.jpg'
import embarrassedImg from '../assets/images/embarrassed.jpg'
import aloneImg from '../assets/images/alone.jpg'

class Home extends Component {
  render(props) {
    return (
      <Wrapper>
        <Masthead
          background="url('https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg') no-repeat center top"
          height="800px">
          <Column maxwidth="960px">
            <MastheadTitle color="black">
              Speak another language
            </MastheadTitle>
            <MastheadSubtitle color="black">
              A unique training program to get you to become fluent in another
              language. We understand the learning process and we create the
              environment that you can learn in.
            </MastheadSubtitle>
            <ButtonCta color="black">Learn More</ButtonCta>
          </Column>
        </Masthead>
        <Section
          height="800px"
          background={`url(${busyPeopleImg}) no-repeat center/cover`}>
          <Column maxwidth="960px">
            <Box>
              <Text color="white" fontsize="3rem">
                Hiring Native Speakers can be expensive
              </Text>
              <Line />
              <Text color="white" fontsize="3rem">
                Not all native speakers are good teachers.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section
          height="800px"
          background={`url(${embarrassedImg}) no-repeat center/cover`}>
          <Column maxwidth="960px">
            <Box>
              <Text color="white" fontsize="3rem">
                Fear of embarrassment is the biggest reason why people won't try
                to speak a new language.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section
          height="800px"
          background={`url(${aloneImg}) no-repeat center/cover`}>
          <Column maxwidth="960px">
            <Box>
              <Text color="white" fontsize="3rem">
                Not enough meetups or people near you to talk with. | You can't
                go to another country and fully immerse yourself in the culture.
                Even if you did, most people don't fully immerse themselves and
                wind up just getting by with broken grammar.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section>
          <Title>Solutions</Title>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                We have native speakers on staff that help create and review our
                material
              </Text>
            </Box>
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                We know how the brain operates and how you can retain what you
                learned.
              </Text>
            </Box>
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                You will learn the 1000 most spoken words in conversation
              </Text>
            </Box>
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                You will be learning with peers. Meaning you will be speaking
                with
                people who are at your level.
              </Text>
            </Box>
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                You don't need a meetup. If you have internet access you can
                start
                practicing with people all over the world.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                We have a policy where no one makes fun of others. If you do,
                you will be banned
              </Text>
            </Box>
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
          </Column>
        </Section>
        <Section>
          <Title>Other Features</Title>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                A flashcard system that will help build your vocabulary
              </Text>
            </Box>
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Box width="50%">
              <Text fontsize="2rem" width="300px">
                You will have tracked progress. A scheduler. A system that lets
                you know where your weak areas are.
              </Text>
            </Box>
            <Img
              src="http://via.placeholder.com/350x350"
              width="350"
              height="350"
            />
          </Column>
        </Section>
        <Section height="800px">
          <Column flexdirection768="row" maxwidth="960px">
            <Box width="50%">
              <Text fontsize="4rem">
                Get Sponsored
              </Text>
            </Box>
            <Box width="50%">
              <Text fontsize="4rem">
                Become a Sponsor
              </Text>
            </Box>
            <Box padding="70px">
              <NavLink style={{fontSize: '1.8rem'}} to="/sponsorship">
                How does this work?
              </NavLink>
            </Box>
          </Column>
        </Section>
        Level System: white, yellow, gold, orange, green, blue, purple, brown,
        red and black
      </Wrapper>
    )
  }
}

export default Home