import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {NavLink} from 'react-router-dom'
import {
  Audio,
  Box,
  Column,
  Dictionary,
  Grid,
  Img,
  PlayBox,
  Spacer,
  RememberSection,
  Subtitle,
  Text,
  Section,
  Wrapper
} from '../../components'

import {Info, Masthead} from './components'
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn
import sharedPhrases from '../../../src/data/shared/phrases.js'

import vocab from '../../../src/data/korean/level1/vocab.js'

// consonants
const giYeog = cdn + vocab.category.alphabet.consonants.ㄱ.korean.audioUrl
const niEun = cdn + vocab.category.alphabet.consonants.ㄴ.korean.audioUrl
const diGeud = cdn + vocab.category.alphabet.consonants.ㄷ.korean.audioUrl
const ssangDiGeud = cdn + vocab.category.alphabet.consonants.ㄸ.korean.audioUrl
const riEur = cdn + vocab.category.alphabet.consonants.ㄹ.korean.audioUrl
const miEum = cdn + vocab.category.alphabet.consonants.ㅁ.korean.audioUrl
const biEub = cdn + vocab.category.alphabet.consonants.ㅂ.korean.audioUrl
const ssangBiEub = cdn + vocab.category.alphabet.consonants.ㅂ.korean.audioUrl
const siOs = cdn + vocab.category.alphabet.consonants.ㅃ.korean.audioUrl
const iEung = cdn + vocab.category.alphabet.consonants.ㅇ.korean.audioUrl
const jiEus = cdn + vocab.category.alphabet.consonants.ㅈ.korean.audioUrl
const ssangGiYeog = cdn + vocab.category.alphabet.consonants.ㄲ.korean.audioUrl
const ssangSiOs = cdn + vocab.category.alphabet.consonants.ㅆ.korean.audioUrl
const chiEus = cdn + vocab.category.alphabet.consonants.ㅊ.korean.audioUrl

// vowels
const a = cdn + vocab.category.alphabet.vowels.ㅏ.korean.audioUrl

// phrases
const hello = cdn + sharedPhrases.greetings.hello.korean.informal.audioUrl
const helloFormal = cdn + sharedPhrases.greetings.hello.korean.formal.audioUrl
const byeStaying =
  cdn + sharedPhrases.greetings.bye.korean.staying.informal.audioUrl
const byeLeaving =
  cdn + sharedPhrases.greetings.bye.korean.leaving.informal.audioUrl
const goodMorning =
  cdn + sharedPhrases.greetings.goodMorning.korean.informal.audioUrl
const goodMorningFormal =
  cdn + sharedPhrases.greetings.goodMorning.korean.formal.audioUrl

class KoreanLevel1 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead
          title="Level One - Hangul"
          subtitle="Learn the Korean alphabet"
        />
        <Info
          subtitle="Alphabet"
          info="Hangul consists of 14 consonants and 10 vowels. We also included the double consonants that have have subtle yet unique sounds to them."
        />
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
              ㄱ{' '}
            </Box>
            <Box alignitems="flex-start">
              기역
            </Box>
            <Box alignitems="flex-start">
              <p>a non-aspirated 'k' sound. Almost like a 'g' sound</p>
            </Box>
            <PlayBox id="giYeog" src={giYeog} />
            <Box>
              ㄲ{' '}
            </Box>
            <Box alignitems="flex-start">
              쌍기역
            </Box>
            <Box alignitems="flex-start">
              <p>a 'g' sound formed from the throat</p>
            </Box>
            <PlayBox id="ssangGiYeog" src={ssangGiYeog} />
            <Box>
              ㄴ
            </Box>
            <Box alignitems="flex-start">

              니은

            </Box>
            <Box alignitems="flex-start">

              <p>'n' sound as in <span style={{color: 'red'}}>n</span>ame</p>

            </Box>
            <PlayBox id="niEun" src={niEun} />
            <Box>
              ㄷ
            </Box>
            <Box alignitems="flex-start">

              디귿

            </Box>
            <Box alignitems="flex-start">

              <p>a non-aspirated 't' sound.</p>

            </Box>
            <PlayBox id="diGeud" src={diGeud} />
            <Box>
              ㄸ
            </Box>
            <Box alignitems="flex-start">

              쌍디귿

            </Box>
            <Box alignitems="flex-start">

              <p>'th' sound as in <span style={{color: 'red'}}>th</span>ing</p>

            </Box>
            <PlayBox id="ssangDiGeud" src={ssangDiGeud} />
            <Box>
              ㄹ{' '}
            </Box>
            <Box alignitems="flex-start">
              리을
            </Box>
            <Box alignitems="flex-start">

              <p>'d' sound as in <span style={{color: 'red'}}>d</span>og</p>

            </Box>
            <PlayBox id="riEur" src={riEur} />
            <Box>
              ㅁ{' '}
            </Box>
            <Box alignitems="flex-start">
              미음
            </Box>
            <Box alignitems="flex-start">

              <p>'d' sound as in <span style={{color: 'red'}}>d</span>og</p>

            </Box>
            <PlayBox id="miEum" src={miEum} />
            <Box>
              ㅂ{' '}
            </Box>
            <Box alignitems="flex-start">
              비읍
            </Box>
            <Box alignitems="flex-start">

              <p>'b' sound as in <span style={{color: 'red'}}>b</span>oy</p>

            </Box>
            <PlayBox id="biEub" src={biEub} />
            <Box>
              ㅃ
            </Box>
            <Box alignitems="flex-start">

              쌍비읍

            </Box>
            <Box alignitems="flex-start">

              a stressed, non-aspirated 'b' sound{' '}

            </Box>
            <PlayBox id="ssangBiEub" src={ssangBiEub} />
            <Box>
              ㅅ{' '}
            </Box>
            <Box alignitems="flex-start">
              시옷
            </Box>
            <Box alignitems="flex-start">

              <p>
                a soft 's' sound as in <span style={{color: 'red'}}>s</span>oft
              </p>

            </Box>
            <PlayBox id="siOs" src={siOs} />
            <Box>
              ㅆ
            </Box>
            <Box alignitems="flex-start">
              쌍시옷
            </Box>
            <Box alignitems="flex-start">

              <p>'s' sound as in <span style={{color: 'red'}}>s</span>ell</p>

            </Box>
            <PlayBox id="ssangSiOs" src={ssangSiOs} />
            <Box>
              ㅇ{' '}
            </Box>
            <Box alignitems="flex-start">
              이응
            </Box>
            <Box alignitems="flex-start">
              <p>
                'ng' sound as in so<span style={{color: 'red'}}>ng</span> or is
                silent
              </p>
            </Box>
            <PlayBox id="iEung" src={iEung} />
            <Box>
              ㅈ
            </Box>
            <Box alignitems="flex-start">
              지웃
            </Box>
            <Box alignitems="flex-start">

              <p>
                'ch' sound as in so<span style={{color: 'red'}}>ch</span>air
              </p>

            </Box>
            <PlayBox id="chiEus" src={chiEus} />
          </Dictionary>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader=".9fr 2fr .9fr"
            gridheader640=".9fr 2.5fr .5fr"
            gridbody=".9fr 2.5fr .5fr"
            gridbody640=".9fr 2.5fr .5fr"
            term="Vowels"
            definition="Pronunciation"
            media="Play">
            <Box>
              ㅏ
            </Box>
            <Box alignitems="flex-start">
              'a' sound
            </Box>
            <PlayBox id="a" src={a} />
          </Dictionary>
        </Section>
        <Info
          subtitle="Greetings"
          info="Let's learn some basic introductory phrases. There are several different forms to use depending on who you are talking to. We will be using just two of the most general cases, formal and informal.  You will generally use the formal form with strangers, people who are older, or people who are higher ranked than you. Informal is used with friends and relatives. You will learn the more specific forms in later lessons."
        />
        <Section alignitems="flex-start" margin="100px 0 0 0" maxwidth="1024px">
          <Dictionary
            gridheader="1fr 2fr 1fr"
            gridheader640="1fr 2fr 1fr"
            gridbody="1fr 2fr 1fr"
            gridbody640="1fr 2fr 1fr"
            term="Greetings"
            definition="Translation"
            media="Play">
            <Box>
              안영
            </Box>
            <Box alignitems="flex-start">
              Hello <span>(informal)</span>
            </Box>
            <PlayBox id="hello" src={hello} />
            <Box>
              안영하세요
            </Box>
            <Box alignitems="flex-start">
              Hello <span>(formal)</span>
            </Box>
            <PlayBox id="helloFormal" src={helloFormal} />
            <Box>
              안영
            </Box>
            <Box alignitems="flex-start">
              Bye <span>(informal)</span>
            </Box>
            <PlayBox id="helloFormal" src={helloFormal} />
            <Box>
              안영히계세요
            </Box>
            <Box alignitems="flex-start">

              Bye <span>(formal, to someone who is staying behind)</span>

            </Box>
            <PlayBox id="byeStaying" src={byeStaying} />
            <Box>
              안영히가세요
            </Box>
            <Box alignitems="flex-start">
              Bye <span>(formal, to someone who is going away)</span>
            </Box>
            <PlayBox id="byeLeaving" src={byeLeaving} />
            <Box>
              좋은 아침
            </Box>
            <Box alignitems="flex-start">
              Good Morning <span>(informal)</span>
            </Box>
            <PlayBox id="goodMorning" src={goodMorning} />
            <Box>
              좋은 아침이에요
            </Box>
            <Box alignitems="flex-start">
              Good Morning<span>(formal)</span>
            </Box>
            <PlayBox id="goodMorningFormal" src={goodMorningFormal} />
          </Dictionary>
        </Section>
        <Info
          subtitle="안영 (Hello, Bye)"
          info="This word has lots of utility. The word literally means 'peace'.  You can use it to say hello, good-morning, good-evening, or good-bye in the informal form. By attaching the verb 하 (do) and the polite ending 세요 to the end of the word you have the polite form of saying hello, 안영하세요, which literally means 'Are you at peace?'. Normally you would use intonation(raising your voice at the end) to make this a question, but it it commonly not intonated."
        />
        <RememberSection
          list={[
            "ㅒ and ㅔ sound the same. Don't be confused by the romanizations which are different.",
            "ㅓ sound it in between the long O and short u sound. It's not a true 'u' sound like in the word 'ugly', but more like the 'o' in 'ordeal' but leaving your mouth open",
            "ㄹ sounds like an 'l' at the beginning of a word",
            "ㄹ sounds like a 'd' in the middle of a word while surrounded by verbs.",
            " TODO: give examples(use sunday) idyoil between a vowel and consonant it is sometimes silent like chicken(talk) it is pronounced tak but with words like read(ilgeoyo) it will be 'l' sound.",
            'When you have a word that contains a syllable starting with ㄹ and that syllable is preceded by a ㅇ or ㄱ being the batchim consonant of that syllable, the ㄹ will actually sound like a ㄴ.',
            '조은 아침 is rarely used.  Instead you would use the all-purpose: 안영 or 안용하세요',
            '공룡 (dinosaur) pronounced gong-nyong'
          ]}
        />
        <Section background="green" height="600px" maxwidth="1024px">
          <Box>
            <Text fontsize="3rem" fontweight="900" color="white">
              <NavLink
                style={{fontSize: '40px', color: 'white'}}
                to="/connections">
                Go Practice!
              </NavLink>
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
// TODO: wrap all pronuciations with a p tag
// TODO: finish romanizing the alphabet
// ref: https://en.wikipedia.org/wiki/Revised_Romanization_of_Hangeul
