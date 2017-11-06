import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Audio,
  Box,
  Column,
  Img,
  MastheadTitle,
  MastheadSubtitle,
  PlayButton,
  Spacer,
  Subtitle,
  Table,
  Td,
  Text,
  Thead,
  Th,
  Tr,
  Title,
  Section,
  Wrapper
} from '../../components'

import {Masthead} from '../../containers'
import Navbar from '../../containers/Navbars/Navbar'
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import vocab from '../../../src/data/korean/level2/vocab.js'

class KoreanLevel2 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead background="gray">
          <Column>
            <Box>
              <MastheadTitle>
                Level Two - Double Consonants & Dipthongs{' '}
              </MastheadTitle>
              <MastheadSubtitle>
                Constructing Dipthongs{' '}
                and Syllables
              </MastheadSubtitle>
            </Box>
          </Column>
        </Masthead>
        <Section maxwidth="960px">
          <Column>
            <Box padding="40px">
              <Subtitle>
                Rules for constructing syllables
              </Subtitle>
              <Text lineheight="3rem">
                Syllables are constructed of either 2, 3 or 4 letters
              </Text>
              <Text lineheight="3rem">
                Must always start with a consonant
              </Text>
              <Text lineheight="3rem">
                Must always start with a consonant
                Vowels always go in the middle of three letter syllable
              </Text>
              <Text lineheight="3rem">
                Vowels always go in the second position of four letter syllable
              </Text>
            </Box>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Subtitle>Construction</Subtitle>
            <Text>Either triangle formation or vertical formation</Text>
            <Text>Which formation depends on the vowel</Text>
            <Text>
              a, i, ya, yae, e, ye, ae, eo, and yeo use the triangle formation
            </Text>
            <Text>eu, u, o, yo, and yu use vertical formation</Text>
          </Column>
        </Section>
        <Section>
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left"
            />
            <Subtitle color="#333" padding="15px">Grammar</Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="175px"
          height960="100px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left"
            />
            <Subtitle color="#333" padding="15px">New Vocabulary</Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="175px"
          height960="100px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left"
            />
            <Subtitle color="#333" padding="15px">New Phrases</Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="175px"
          height960="900px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">column 1</Subtitle>
              <Text>
                ㅎ = 'h' sound
              </Text>
            </Column>
          </Column>
          <Column>
            <Column
              justifycontent="flex-start"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">column 2</Subtitle>
              <Text>
                ㅣ = 'ee' sound
              </Text>
            </Column>
          </Column>
        </Section>
      </Wrapper>
    )
  }
}

export default KoreanLevel2

// TODO: show how to construct syllables
