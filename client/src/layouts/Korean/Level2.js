import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Audio,
  Box,
  Dictionary,
  MastheadTitle,
  MastheadSubtitle,
  PlayButton,
  RememberSection,
  Subtitle,
  Text,
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
const ssangGiYeog = cdn + vocab.doubleConsonants.ㄲ.korean.audioUrl

const ae = cdn + vocab.dipthongs.애.korean.audioUrl

class KoreanLevel2 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead background="#3269AD">
          <Box>
            <MastheadTitle>
              Level Two - Double Consonants & Dipthongs{' '}
            </MastheadTitle>
            <MastheadSubtitle>
              Constructing Dipthongs{' '}
              and Syllables
            </MastheadSubtitle>
          </Box>
        </Masthead>
        <Section margin="100px 0 0 0" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              How to construct Syllables
            </Subtitle>
            <Text fontsize="1.5rem" margin="20px 0 0 0">
              Either triangle formation or vertical formation.
              Which formation depends on the vowel.
              a, i, ya, yae, e, ye, ae, eo, and yeo use the triangle formation.
              eu, u, o, yo, and yu use vertical formation.
            </Text>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader=".9fr .5fr 2fr .9fr"
            gridheader640=".9fr .8fr 2.5fr .5fr"
            gridbody=".9fr .8fr 1.8fr .7fr"
            gridbody640=".9fr .8fr 2.5fr .5fr"
            height="600px"
            term="Consonants"
            definition="Pronunciation"
            media="Play"
            name="Name"
            width="100vw"
            overflowy="scroll">
            <Box>
              <p>
                ㄲ{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                쌍기역 (ssang-gi-yeog)
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'gg' sound{' '}
              </p>
            </Box>
            <Box>
              <audio id="ssangGiYeog" src={`${ssangGiYeog}`} />
              <PlayButton
                name="ssangGiYeog"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
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
              <p>
                애{' '}
              </p>
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
        </Section>
        <RememberSection
          list={[
            'Syllables are constructed of either 2, 3 or 4 letters',
            'Must always start with a consonant',
            'Vowels always go in the middle of three letter syllable',
            'Vowels always go in the second position of four letter syllable'
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
