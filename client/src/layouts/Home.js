import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Masthead} from '../containers'

import {
  Box,
  ButtonCta,
  Column,
  Flex,
  Grid,
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
import homeMastheadImg from '../assets/images/two-guys.jpg'
import embarrassedImg from '../assets/images/embarrassed.jpg'
import aloneImg from '../assets/images/alone.jpg'
import teensImg from '../assets/images/teens.jpg'
import visitingImg from '../assets/images/walking-around.jpg'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr;
  grid-template-areas:
    'masthead masthead'
    'using using'
    'tags tags';
`

// @media (min-width: 1080px) {
//   grid-template-columns: 1fr;
//   grid-template-areas:
//     'masthead'ridj
//     'tags';
// }

function Home(props) {
  return (
    <Wrapper>
      <StyledGrid>
        <Masthead
          gridarea="masthead"
          background={`url(${homeMastheadImg}) center/contain`}
          height="600px"
          padding="200px 20px 100px 20px">
          <Column maxwidth="960px">
            <MastheadTitle color="white">Speak another language</MastheadTitle>
            <MastheadSubtitle color="white" fontsize="1.5rem">
              Not speaking your new language yet? We can help.
            </MastheadSubtitle>
            <ButtonCta color="black">Learn More</ButtonCta>
          </Column>
        </Masthead>
      </StyledGrid>
      <Section alignitems="center" background="#e3e3e3" height="550px">
        <Column flexdirection768="row" margin="0 auto" maxwidth="960px">
          <Box>
            <Text fontsize="1.3rem" padding="20px">
              Studied a second language in school but can't hold a basic
              conversation.
            </Text>
            <Line color="black" width="200px" />
            <Text fontsize="1.3rem" padding="20px">
              Those many hours you spent in class don't have to go to waste. Our
              platform helps you reclaim that lost knowledge.
            </Text>
          </Box>
          <Img src={`${busyPeopleImg}`} width="500" height="400" />
        </Column>
      </Section>
      <Section alignitems="center" height="550px">
        <Column flexdirection768="row" margin="0 auto" maxwidth="960px">
          <Img src={`${embarrassedImg}`} width="500" height="400" />
          <Box>
            <Text fontsize="1.3rem" padding="20px">
              The fear of embarrassment is the biggest reason why people won't
              attempt to speak a new language.
            </Text>
            <Line color="black" width="200px" />
            <Text fontsize="1.3rem" padding="20px">
              You will be learning with peers. Meaning you will be speaking with
              people who are at your level.
            </Text>
          </Box>
        </Column>
      </Section>
      <Section alignitems="center" background="#e3e3e3" height="550px">
        <Column flexdirection768="row" margin="0 auto" maxwidth="960px">
          <Box>
            <Text fontsize="1.3rem" padding="20px">
              Not enough meetups or people near you to talk with.
            </Text>
            <Line color="black" width="200px" />
            <Text fontsize="1.3rem" padding="20px">
              You don't need a meetup. If you have internet access you can start
              practicing with people all over the world.
            </Text>
          </Box>
          <Img src={`${aloneImg}`} width="500" height="400" />
        </Column>
      </Section>
      <Section alignitems="center" height="550px">
        <Column flexdirection768="row" margin="0 auto" maxwidth="960px">
          <Img src={`${visitingImg}`} width="500" height="400" />
          <Box>
            <Text fontsize="1.3rem" padding="20px">
              So you can't go to another country and fully immerse yourself. And
              even if you did, most people wind up just getting by with basic
              conversation.
            </Text>
            <Line color="black" width="200px" />
            <Text fontsize="1.3rem" padding="20px">
              Our platform could possibly be better! You get focused practice
              anytime you want it.
            </Text>
          </Box>
        </Column>
      </Section>
      <Section alignitems="center">
        <Column>
          <Title>Why should you learn a second language?</Title>
          <Title>There are countless reasons but here are just a few:</Title>
          <Box width="50%">
            <Text fontsize="1rem">
              People who are bilingual have more opportunities to make income
            </Text>
            <Text fontsize="1rem">
              You will increase your perceived value and self-worth
            </Text>
            <Text fontsize="1rem">
              Language is the most important piece to learning another country's
              culture
            </Text>
            <Text fontsize="1rem">
              You'll meet new people and make new relationships
            </Text>
            <Text fontsize="1rem">
              One of the most rewarding skills to have. Once you learn a second
              language it's easier to obtain others.
            </Text>
            <Text fontsize="1rem">
              This is the gateway to adapting to the global economy.
            </Text>
            <Text fontsize="1rem">
              You're soulmate could possibly be speaking a different language!
            </Text>
          </Box>
        </Column>
        {/*
        <Column flexdirection768="row" margin="0 auto" maxwidth="960px">
          <Box width="50%">
            <Text fontsize="4rem">Get Sponsored</Text>
          </Box>
          <Box width="50%">
            <Text fontsize="4rem">Become a Sponsor</Text>
          </Box>
          <Box padding="70px">
            <NavLink style={{fontSize: '1.8rem'}} to="/sponsorship">
              How does this work?
            </NavLink>
          </Box>
        </Column>
        */}
      </Section>
      <Section alignitems="center" height="550px">
        <Column flexdirection768="row" maxwidth="960px" />
      </Section>
    </Wrapper>
  )
}

export default Home
