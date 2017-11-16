import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Audio,
  Box,
  Column,
  Dictionary,
  Grid,
  Img,
  MastheadTitle,
  MastheadSubtitle,
  PlayButton,
  Spacer,
  RememberSection,
  Subtitle,
  Text,
  Section,
  Wrapper
} from '../../components'

import {Masthead} from '../../containers'
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import vocab from '../../../src/data/korean/level1/vocab.js'
const giYeog = cdn + vocab.category.alphabet.consonants.ㄱ.korean.audioUrl
const niEun = cdn + vocab.category.alphabet.consonants.ㄴ.korean.audioUrl
const diGeud = cdn + vocab.category.alphabet.consonants.ㄷ.korean.audioUrl
const riEur = cdn + vocab.category.alphabet.consonants.ㄹ.korean.audioUrl
const miEum = cdn + vocab.category.alphabet.consonants.ㅁ.korean.audioUrl
const biEub = cdn + vocab.category.alphabet.consonants.ㅂ.korean.audioUrl
const siOs = cdn + vocab.category.alphabet.consonants.ㅅ.korean.audioUrl
const iEung = cdn + vocab.category.alphabet.consonants.ㅇ.korean.audioUrl
const jiEus = cdn + vocab.category.alphabet.consonants.ㅈ.korean.audioUrl

// phrases
// const level7_6 = cdn + source.category.examples.level7_6.korean.audioUrl

class KoreanLevel1 extends Component {
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
              Level One - Hangul
            </MastheadTitle>
            <MastheadSubtitle>
              Learn the Korean alphabet
            </MastheadSubtitle>
          </Box>
        </Masthead>
        <Section height="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Alphabet{' '}
            </Subtitle>
            <Text fontsize="1.5rem" margin="20px 0 0 0">
              Hangul consists of 14 consonants and 10 vowels.
            </Text>
          </Box>
        </Section>
        <Section alignitems="flex-start" maxwidth960="1024px">
          <Dictionary
            gridheader=".9fr .5fr 2fr .9fr"
            gridheader640=".9fr .8fr 2.5fr .5fr"
            gridbody=".9fr .8fr 2.5fr .5fr"
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
                ㄱ{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                기역 (gi-yeog)
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'g' or 'k' sound{' '}
              </p>
            </Box>
            <Box>
              <audio id="giYeog" src={`${giYeog}`} />
              <PlayButton
                margin="0"
                name="giYeog"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>
                ㄴ
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                니은 (niEun)
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'n' sound as in <span style={{color: 'red'}}>n</span>ame{' '}
              </p>
            </Box>
            <Box>
              <audio id="niEun" src={`${niEun}`} />
              <PlayButton
                margin="0"
                name="niEun"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㄷ</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                디귿 (diGeud)
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'r' sound as in <span style={{color: 'red'}}>r</span>ain{' '}
              </p>
            </Box>
            <Box>
              <audio id="diGeud" src={`${diGeud}`} />
              <PlayButton
                margin="0"
                name="diGeud"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㄹ{' '}</p>
            </Box>
            <Box alignitems="flex-start">
              <p>리을 (riEur)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'd' sound as in <span style={{color: 'red'}}>d</span>og{' '}
              </p>
            </Box>
            <Box>
              <audio id="riEur" src={`${riEur}`} />
              <PlayButton
                margin="0"
                name="riEur"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㅁ{' '}</p>
            </Box>
            <Box alignitems="flex-start">
              <p>미음 (miEum)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'd' sound as in <span style={{color: 'red'}}>d</span>og{' '}
              </p>
            </Box>
            <Box>
              <audio id="miEum" src={`${miEum}`} />
              <PlayButton
                margin="0"
                name="miEum"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㅂ{' '}</p>
            </Box>
            <Box alignitems="flex-start">
              <p>비읍 (biEub)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'b' sound as in <span style={{color: 'red'}}>b</span>oy{' '}
              </p>
            </Box>
            <Box>
              <audio id="biEub" src={`${biEub}`} />
              <PlayButton
                margin="0"
                name="biEub"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㅅ{' '}</p>
            </Box>
            <Box alignitems="flex-start">
              <p>시옷 (siOs)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'sh' sound as in <span style={{color: 'red'}}>sh</span>ell{' '}
              </p>
            </Box>
            <Box>
              <audio id="siOs" src={`${siOs}`} />
              <PlayButton
                margin="0"
                name="siOs"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㅇ{' '}</p>
            </Box>
            <Box alignitems="flex-start">
              <p>이응 (iEung)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'ng' sound as in so<span style={{color: 'red'}}>ng</span> or is
              </p>
              silent
            </Box>
            <Box>
              <audio id="iEung" src={`${iEung}`} />
              <PlayButton
                margin="0"
                name="iEung"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>ㅈ</p>
            </Box>
            <Box alignitems="flex-start">
              <p>지웃 (jiEus)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                'ch' sound as in so<span style={{color: 'red'}}>ch</span>air{' '}
              </p>
            </Box>
            <Box>
              <audio id="iEung" src={`${iEung}`} />
              <PlayButton
                margin="0"
                name="iEung"
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
            gridheader=".9fr .5fr 2fr .9fr"
            gridheader640=".9fr .8fr 2.5fr .5fr"
            gridbody=".9fr .8fr 2.5fr .5fr"
            gridbody640=".9fr .8fr 2.5fr .5fr"
            term="Vowels"
            definition="Pronunciation"
            media="Play"
            name="Name">
            <Box>
              <p>ㄱ{' '}</p>
            </Box>
            <Box>
              <p>기역 (gi-yeog)</p>
            </Box>
            <Box alignitems="flex-start">
              <p>'g' or 'k' sound{' '}</p>
            </Box>
            <Box>
              <audio id="giYeog" src={`${giYeog}`} />
              <PlayButton
                margin="0"
                name="giYeog"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <RememberSection
          list={[
            "ㅒ and ㅔ sound the same. Don't be confused by the romanizations which are different.",
            "ㅓ sound it in between the long O and short u sound. It's not a true 'u' sound like in the word 'ugly', but more like the 'o' in 'ordeal' but leaving your mouth open",
            "ㄹ sounds like an 'l' at the beginning of a word",
            "ㄹ sounds like a 'd' in the middle of a word while surrounded by verbs.",
            " TODO: give examples(use sunday) idyoil between a vowel and consonant it is sometimes silent like chicken(talk) it is pronounced tak but with words like read(ilgeoyo) it will be 'l' sound.",
            'When you have a word that contains a syllable starting with ㄹ and that syllable is preceded by a ㅇ or ㄱ being the batchim consonant of that syllable, the ㄹ will actually sound like a ㄴ.',
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

export default KoreanLevel1
// TODO: finish romanizing the alphabet
// ref: https://en.wikipedia.org/wiki/Revised_Romanization_of_Hangeul
