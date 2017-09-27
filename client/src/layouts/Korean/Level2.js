import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Column,
  Masthead,
  Section,
  Subtitle,
  Text,
  Title,
  Wrapper
} from '../../components'

import Navbar from '../../containers/Navbars/Navbar'

class KoreanLevel2 extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead
          background="#666"
          height="450px"
          height768="300px"
          padding="30px"
          textalign="left">
          <Title color="white" fontsize="2rem">
            Level Two - Double Consonants & Dipthongs{' '}
          </Title>
          <Subtitle color="#bbb" fontsize="1.5rem">
            Constructing Dipthongs{' '}
          </Subtitle>
          <Subtitle color="#bbb" fontsize="1.5rem">
            Constructing Syllabes
          </Subtitle>
        </Masthead>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="175px"
          height960="200px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">Rules</Subtitle>
              <Text>Constructing syllables</Text>
              <Text>Syllables are constructed of either 2, 3 or 4 letters</Text>
              <Text>Must always start with a consonant</Text>
              <Text>
                Vowels always go in the middle of three letter syllable
              </Text>
              <Text>
                Vowels always go in the second position of four letter syllable
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="175px"
          height960="200px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">Construction</Subtitle>
              <Text>Either triangle formation or vertical formation</Text>
              <Text>Which formation depends on the vowel</Text>
              <Text>
                a, i, ya, yae, e, ye, ae, eo, and yeo use the triangle formation
              </Text>
              <Text>eu, u, o, yo, and yu use vertical formation</Text>
            </Column>
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
