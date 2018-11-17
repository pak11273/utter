import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Audio,
  Box,
  Dictionary,
  PlayButton,
  RememberSection,
  Subtitle,
  Text,
  Title,
  Section,
  Wrapper
} from '../../components'

import {Masthead} from '../../containers'

import {Info} from './components'
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import vocab from '../../../src/data/korean/level2/vocab.js'

const ae = cdn + vocab.dipthongs.애.korean.audioUrl

class KoreanLevel2 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead
          title="Level Two - Syllables"
          subtitle="Constructing Dipthongs and Syllables"
        />
        <Info
          subtitle="How to construct Syllables"
          info="Either triangle formation or vertical formation.  Which formation depends on the vowel.  a, i, ya, yae, e, ye, ae, eo, and yeo use the triangle formation.  eu, u, o, yo, and yu use vertical formation."
        />
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 2fr 1fr"
            gridheader640="1fr 2fr 1fr"
            gridbody="1fr 2fr 1fr"
            gridbody640="1fr 2fr 1fr"
            term="Dipthongs"
            definition="Pronunciation"
            media="Play"
            width="100vw">
            <Box>
              <p>애 </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'e' sound as in so<span style={{color: 'red'}}>e</span>gg{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="ae" src={`${ae}`} />
              <PlayButton
                margin="0 0 0 10px"
                name="ae"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
          <Section minheight="600px" maxwidth="1024px">
            <Box padding="40px">
              <Subtitle>Introductions </Subtitle>
              <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
                As a determiner you add 이,그, or 저 to the left of the noun.
                eg. this thing is an arm(이거 팔이여요). This thing is used when
                you have something that is within your reach. 저 is used when
                things are far away from you and the person you are talking to,
                while 그 is used when it's far away from you but near the person
                you are speaking to. You might be wondering about using "the" or
                "a" in Korean, but in Korean there are no such articles. So "the
                boy" or "a boy" is simply "boy" 이것이 저것보다 좋아요 이거는
                저거보다 좋네요 이게 is short for 이것이 이것이 저거보다 좋아요
                = 이게 저거보다 좋아요
              </Text>
            </Box>
          </Section>
        </Section>
        <RememberSection
          list={[
            " TODO: give examples(use sunday) idyoil between a vowel and consonant it is sometimes silent like chicken(talk) it is pronounced tak but with words like read(ilgeoyo) it will be 'l' sound.",
            'When you have a word that contains a syllable starting with ㄹ and that syllable is preceded by a ㅇ or ㄱ being the batchim consonant of that syllable, the ㄹ will actually sound like a ㄴ.',
            'Syllables are constructed of either 2, 3 or 4 letters',
            'Must always start with a consonant',
            'Vowels always go in the middle of three letter syllable',
            'Vowels always go in the second position of four letter syllable',
            '공룡 (dinosaur) pronounced gong-nyong'
          ]}
        />
        <Section background="green" height="600px" maxwidth="1024px">
          <Box>
            <Text fontsize="3rem" fontweight="900" color="white">
              Go Practice!{' '}
            </Text>
            <Text color="white" padding="20px">
              <a>Channel Selection & Room Etiquette</a>
            </Text>
          </Box>
        </Section>
      </Wrapper>
    )
  }
}

export default KoreanLevel2

// TODO: show how to construct syllables
