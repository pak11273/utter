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
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import source from '../../../src/data/spanish/level2/vocab.js'

// phrases
// const level7_6 = cdn + source.category.examples.level7_6.korean.audioUrl

class SpanishLevel2 extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead background="gray">
          <Column>
            <Box>
              <MastheadTitle>
                Level Two - Spanish{' '}
              </MastheadTitle>
              <MastheadSubtitle>
                Learn the Spanish alphabet
              </MastheadSubtitle>
            </Box>
          </Column>
        </Masthead>
        <Section maxwidth="960px">
          <Column>
            <Box padding="40px">
              <Subtitle>
                Greetings{' '}
              </Subtitle>
              <Text lineheight="3rem">
                Spanish 2
              </Text>
            </Box>
            <Box color="black" overflowx="auto">
              <Table verticalalign="middle">
                <Thead>
                  <Th width="18%">
                    Consonants{' '}
                  </Th>
                  <Th width="28%">
                    Name{' '}
                  </Th>
                  <Th width="28%">
                    Translation
                  </Th>
                  <Th width="10%">
                    Play
                  </Th>
                </Thead>
                <tbody />
              </Table>
            </Box>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="700px"
          height960="700px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">Consonants</Subtitle>
              <Text>
                ㄱ = 'g' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>
                  k
                </span>ite)
              </Text>
              <Text>
                ㄲ = 'kk' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>k</span>ite)
              </Text>
              <Text>
                ㄴ = 'n' sound
              </Text>
              <Text>
                ㄷ = 'd' or 't' sound
              </Text>
              <Text>
                ㄹ = 'r' or 'l' sound
              </Text>
              <Text>
                ㅁ = 'm' sound
              </Text>
              ㅂ = 'b' or 'p' sound
              <Text>
                ㅅ = 's' sound
              </Text>
              <Text>
                ㅇ = 'ng' sound
              </Text>
              <Text>
                ㅈ = 'j' or 'ch' sound
              </Text>
              <Text>
                ㅊ = 'ch' sound
              </Text>
              <Text>
                ㅋ = 'kk' sound
              </Text>
              <Text>
                ㅌ = 't' sound
              </Text>
              <Text>
                ㅍ= 'pp' sound
              </Text>
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
              <Subtitle color="#333" padding="15px">Vowels</Subtitle>
              <Text>
                ㅒ = 'ae' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>e</span>gg)
              </Text>
              <Text>
                ㅔ = 'e' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>
                  e
                </span>gg)
              </Text>
              <Text padding="20px">
                ㅒ and ㅔ sound the same. Don't be confused by the romanizations
                which are different.{' '}
              </Text>
              <Text>
                ㅏ = 'a' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>
                  a
                </span>ha)
              </Text>
              <Text>
                ㅓ = 'eo' sound
              </Text>
              <Text padding="20px">
                ㅓ sound it in between the long O and short u sound. It's not a
                true 'u' sound like in the word 'ugly', but more like the 'o' in
                'ordeal' but leaving your mouth open
              </Text>
              <Text />
              <Text>
                ㅗ = 'o' sound
              </Text>
              <Text>
                ㅜ = 'oo' or 'u' sound
              </Text>
              <Text>
                ㅡ = 'eu' sound
              </Text>
              <Text>
                ㅣ = 'ee' sound
              </Text>
            </Column>
          </Column>
        </Section>
        <Section>
          <Subtitle color="#333" padding="15px">
            Vowels with y and w
          </Subtitle>
          <Text>
            Special vowels that are constructed with the y and w sounds.
          </Text>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="400px"
          height960="400px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Text>
                ㅠ = 'yu' sound
              </Text>
              <Text>
                ㅑ = 'ya' sound
              </Text>
              <Text>
                ㅕ = 'yeo' sound
              </Text>
              <Text>
                ㅛ = 'yo' sound
              </Text>
              <Text>
                ㅖ = 'ye' sound{' '}
              </Text>
              <Text>
                ㅖ = 'yi' sound{' '}
              </Text>
            </Column>
          </Column>
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Text>
                ㅠ = 'wu' sound
              </Text>
              <Text>
                ㅑ = 'wa' sound
              </Text>
              <Text>
                ㅕ = 'weo' sound
              </Text>
              <Text>
                ㅛ = 'wo' sound
              </Text>
              <Text>
                ㅖ = 'we' sound{' '}
              </Text>
              <Text>
                ㅖ = 'wi' sound{' '}
              </Text>
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
          height960="200px"
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
          height960="200px"
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
            <Text>Greetings and Goodbyes</Text>
            <Text>Annyeong ha seyo, anyeonghigeseyo</Text>
            <Text>yo du bun</Text>
            <Text>My name is</Text>
            <Text>nice to meet you</Text>
            <Text>Thank You</Text>
            <Text>You're Welcome</Text>
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
            <Title fontsize="2rem">Special Notes</Title>
            <Text>
              ㄹ sounds like an 'l' at the beginning of a word
              ㄹ sounds like a 'd' in the middle of a word while surrounded by
              verbs.
              TODO: give examples(use sunday) idyoil

              between a vowel and consonant it is sometimes silent like
              chicken(talk) it is pronounced tak

              but with words like read(ilgeoyo) it will be 'l' sound.
              When you have a word that contains a syllable starting with ㄹ and
              that syllable is preceded by a ㅇ or ㄱ being the batchim consonant
              of that syllable, the ㄹ will actually sound like a ㄴ.
              공룡 (dinosaur) pronounced gong-nyong
            </Text>
          </Column>
        </Section>
      </Wrapper>
    )
  }
}

export default SpanishLevel2