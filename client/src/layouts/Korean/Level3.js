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
import Navbar from '../../containers/Navbars/Navbar'

class KoreanLevel3 extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead
          background="#666"
          height="450px"
          height768="300px"
          padding="30px"
          textalign="left">
          <Title color="white" fontsize="2rem">Level Three - Basic Words</Title>
          <Subtitle color="#bbb" fontsize="1.5rem">
            These are the fundamental words that will help you get started to
            learning the language. In future lessons you will be using the words
            to construct sentences.
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
              <Subtitle color="#333" padding="15px">Nouns</Subtitle>
              <Text>

                bear = 곰 = 'gom'
                ㄱ = 'g' sound (as in{' '}
                <span style={{fontWeight: 'bold'}}>
                  g
                </span>ear)
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
                ㅏ = 'a' sound
              </Text>
              <Text>
                ㅑ = 'ya' sound
              </Text>
              <Text>
                ㅓ = 'eo' sound
              </Text>
              <Text>
                ㅕ = 'yeo' sound
              </Text>
              <Text />
              <Text>
                ㅗ = 'o' sound
              </Text>
              ㅛ = 'yo' sound
              <Text>
                ㅜ = 'oo' or 'u' sound
              </Text>
              <Text>
                ㅠ = 'yoo' or 'yu' sound
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
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="975px"
          height960="900px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            Intro to pachim
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
            <Text>Something here</Text>
          </Column>
        </Section>
      </Wrapper>
    )
  }
}

export default KoreanLevel3
