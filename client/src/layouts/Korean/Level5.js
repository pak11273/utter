import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Column,
  Masthead,
  Subtitle,
  Text,
  Title,
  Section,
  Wrapper
} from '../../components'

class KoreanLevel5 extends Component {
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
            Level Five - Four+ Letter Syllables
          </Title>
          <Subtitle color="#bbb" fontsize="1.5rem">
            Using the triangle and vertical formations we can form the three
            letter syllables
          </Subtitle>
        </Masthead>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="975px"
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
              <Subtitle color="#333" padding="15px">
                consonants + wa
              </Subtitle>
              <Text>ng + wa = wa</Text>
              <Text>ng + weo = weo </Text>
              <Text>ng + ae = wae</Text>
              <Text>ng + e = we</Text>
              <Text>ng + i = wi</Text>
              <Text>ng + i = weu</Text>
              <Text />
            </Column>
          </Column>
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">
                g + vowels
              </Subtitle>
              <Text>ho + a = hwa</Text>
              <Text>hu + eo = hweo</Text>
              <Text>ho + ae = hwae</Text>
              <Text>ho + e = we</Text>
              <Text>o + i = wi</Text>
              <Text>eu + i = weu</Text>
              <Text />
            </Column>
          </Column>
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">
                h, d, m, s, t, kk, pp, bb, ss + vowels
              </Subtitle>
              <Text>pending</Text>
            </Column>
          </Column>
          <Column>
            <Column
              justifycontent="flex-start"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle color="#333" padding="15px">
                Native
              </Subtitle>
              <Text>
                Used for general things like telling age, number of people, hour
                of the day, number of hours, number of things.
              </Text>
              <Text>
                Hana, duel, set, net, tasut, yeust, ilgop, yudul, ahop, yul, yul
                hana = 10, seu mul = 20, seu-mul hana = 21, su-reun=30, hhhhhhhh
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="975px"
          height960="900px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Text>Phrases</Text>
            <Text>Greetings and Goodbyes</Text>
            <Text>Hwaiting! You can do it!</Text>
          </Column>
        </Section>
      </Wrapper>
    )
  }
}

export default KoreanLevel5
