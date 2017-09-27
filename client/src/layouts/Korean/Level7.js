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

class KoreanLevel4 extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead
          background="#666"
          height="450px"
          height768="300px"
          padding="30px"
          textalign="left">
          <Title color="white" fontsize="2rem">Level Seven - Adjectives</Title>
          <Subtitle color="#bbb" fontsize="1.5rem">
            It's now time to build on your basic vocabulary. We start by
            teaching you
            a few adjectives and then you will learn to combine those adjectives
            to describe the vocabulary you have learned. In this level you will
            reinforce your current vocabulary giving them a little more color
            with adjectives.

            adjectives describe nouns

            adjectives come from "descriptive" verbs

            steps to change(conjugate) a verb into adjective:

            keun
            1) keu da = to be big

            2) remove da

            3) add n or eun then make keun

            chagun
            1) jak-da
            2) remove da
            3) ja-geun

            rules: adj + noun
            big = keun small = chagun + house(noun) = keun jip (big house)

            if verb stem ends with p(biyup)

            1) remove p

            2) add u + n

            "to be difficult" = eo-dyup-da

            eo-dyup-un

            if verb stem ends with l
            1) remove l
            2) add n

            meol-da (far)
            meon

            if verb stem ends with it-da

            1) remove da
            2) and neun

            it-da => i-neun

            "action" verbs

            description.
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
      </Wrapper>
    )
  }
}

export default KoreanLevel4
