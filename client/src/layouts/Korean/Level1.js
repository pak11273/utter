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
const ssangBiEub = cdn + vocab.category.alphabet.consonants.ㅃ.korean.audioUrl
const siOs = cdn + vocab.category.alphabet.consonants.ㅅ.korean.audioUrl
const iEung = cdn + vocab.category.alphabet.consonants.ㅇ.korean.audioUrl
const jiEuj = cdn + vocab.category.alphabet.consonants.ㅈ.korean.audioUrl
const ssangJiEuj = cdn + vocab.category.alphabet.consonants.ㅉ.korean.audioUrl
const ssangGiYeog = cdn + vocab.category.alphabet.consonants.ㄲ.korean.audioUrl
const ssangSiOs = cdn + vocab.category.alphabet.consonants.ㅆ.korean.audioUrl
const chiEuch = cdn + vocab.category.alphabet.consonants.ㅊ.korean.audioUrl
const kiEuk = cdn + vocab.category.alphabet.consonants.ㅋ.korean.audioUrl
const tiEut = cdn + vocab.category.alphabet.consonants.ㅌ.korean.audioUrl
const piEup = cdn + vocab.category.alphabet.consonants.ㅍ.korean.audioUrl
const hiEuh = cdn + vocab.category.alphabet.consonants.ㅎ.korean.audioUrl

// vowels
const a = cdn + vocab.category.alphabet.vowels.ㅏ.korean.audioUrl
const ya = cdn + vocab.category.alphabet.vowels.ㅑ.korean.audioUrl
const eo = cdn + vocab.category.alphabet.vowels.ㅓ.korean.audioUrl
const yeo = cdn + vocab.category.alphabet.vowels.ㅕ.korean.audioUrl
const o = cdn + vocab.category.alphabet.vowels.ㅗ.korean.audioUrl
const yo = cdn + vocab.category.alphabet.vowels.ㅛ.korean.audioUrl
const u = cdn + vocab.category.alphabet.vowels.ㅜ.korean.audioUrl
const yu = cdn + vocab.category.alphabet.vowels.ㅠ.korean.audioUrl
const eu = cdn + vocab.category.alphabet.vowels.ㅡ.korean.audioUrl
const i = cdn + vocab.category.alphabet.vowels.ㅣ.korean.audioUrl

// phrases
const hello = cdn + sharedPhrases.greetings.hello.korean.informal.audioUrl
const helloFormal = cdn + sharedPhrases.greetings.hello.korean.formal.audioUrl
const byeStaying =
  cdn + sharedPhrases.greetings.bye.korean.staying.formal.audioUrl
const byeLeaving =
  cdn + sharedPhrases.greetings.bye.korean.leaving.formal.audioUrl
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

              <p>a non-aspirated 't' sound</p>

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

              <p>an 'l' like sound or 'd' sound depending on position</p>

            </Box>
            <PlayBox id="riEur" src={riEur} />
            <Box>
              ㅁ{' '}
            </Box>
            <Box alignitems="flex-start">
              미음
            </Box>
            <Box alignitems="flex-start">

              <p>'m' sound as in <span style={{color: 'red'}}>m</span>om</p>

            </Box>
            <PlayBox id="miEum" src={miEum} />
            <Box>
              ㅂ{' '}
            </Box>
            <Box alignitems="flex-start">
              비읍
            </Box>
            <Box alignitems="flex-start">

              <p>a non-aspirated 'p' sound</p>

            </Box>
            <PlayBox id="biEub" src={biEub} />
            <Box>
              ㅃ
            </Box>
            <Box alignitems="flex-start">

              쌍비읍

            </Box>
            <Box alignitems="flex-start">

              a 'b' sound formed from the throat

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
                a non-aspirated 'ch' sound
              </p>

            </Box>
            <PlayBox id="jiEuj" src={jiEuj} />
            <Box>
              ㅉ{' '}
            </Box>
            <Box alignitems="flex-start">
              쌍지읒
            </Box>
            <Box alignitems="flex-start">

              <p>
                'j' sound from the throat
              </p>

            </Box>
            <PlayBox id="ssangJiEuj" src={ssangJiEuj} />
            <Box>
              ㅊ{' '}
            </Box>
            <Box alignitems="flex-start">
              치읓
            </Box>
            <Box alignitems="flex-start">

              <p>
                'ch' sound as in <span style={{color: 'red'}}>ch</span>air{' '}
              </p>

            </Box>
            <PlayBox id="chiEuch" src={chiEuch} />
            <Box>
              ㅋ
            </Box>
            <Box alignitems="flex-start">
              키읔
            </Box>
            <Box alignitems="flex-start">

              <p>
                'k' sound as in <span style={{color: 'red'}}>k</span>ite
              </p>

            </Box>
            <PlayBox id="kiEuk" src={kiEuk} />
            <Box>
              ㅌ{' '}
            </Box>
            <Box alignitems="flex-start">
              티읕
            </Box>
            <Box alignitems="flex-start">

              <p>
                't' sound as in <span style={{color: 'red'}}>t</span>ime
              </p>

            </Box>
            <PlayBox id="tiEut" src={tiEut} />
            <Box>
              ㅍ
            </Box>
            <Box alignitems="flex-start">
              피읖
            </Box>
            <Box alignitems="flex-start">

              <p>
                'p' sound as in <span style={{color: 'red'}}>p</span>ig
              </p>

            </Box>
            <PlayBox id="piEup" src={piEup} />
            <Box>
              ㅎ
            </Box>
            <Box alignitems="flex-start">
              히읗
            </Box>
            <Box alignitems="flex-start">

              <p>
                'h' sound as in <span style={{color: 'red'}}>h</span>at
              </p>

            </Box>
            <PlayBox id="hiEuh" src={hiEuh} />
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
              'ah' sound
            </Box>
            <PlayBox id="a" src={a} />
            <Box>
              ㅑ
            </Box>
            <Box alignitems="flex-start">
              'yah' sound
            </Box>
            <PlayBox id="yah" src={ya} />
            <Box>
              ㅓ
            </Box>
            <Box alignitems="flex-start">
              in between 'uh' and 'oh' sound
            </Box>
            <PlayBox id="eo" src={eo} />
            <Box>
              ㅕ
            </Box>
            <Box alignitems="flex-start">
              in between 'yuh' and 'yoh' sound
            </Box>
            <PlayBox id="yeo" src={yeo} />
            <Box>
              ㅗ
            </Box>
            <Box alignitems="flex-start">
              <p>
                'o' sound as in d<span style={{color: 'red'}}>ough</span>nut
              </p>
            </Box>
            <PlayBox id="o" src={o} />
            <Box>
              ㅛ
            </Box>
            <Box alignitems="flex-start">
              <p>'yo' sound as in <span style={{color: 'red'}}>yo yo</span></p>
            </Box>
            <PlayBox id="yo" src={yo} />
            <Box>
              ㅜ
            </Box>
            <Box alignitems="flex-start">
              <p>'ew' sound as in sh<span style={{color: 'red'}}>oe</span></p>
            </Box>
            <PlayBox id="u" src={u} />
            <Box>
              ㅠ
            </Box>
            <Box alignitems="flex-start">
              <p>'you' sound as in <span style={{color: 'red'}}>you</span></p>
            </Box>
            <PlayBox id="yu" src={yu} />
            <Box>
              ㅡ
            </Box>
            <Box alignitems="flex-start">
              <p>'eu' sound as in l<span style={{color: 'red'}}>oo</span>k</p>
            </Box>
            <PlayBox id="eu" src={eu} />
            <Box>
              ㅣ
            </Box>
            <Box alignitems="flex-start">
              <p>'e' sound as in e<span style={{color: 'red'}}>at</span></p>
            </Box>
            <PlayBox id="i" src={i} />
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
            <PlayBox id="hello" src={hello} />
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
            <Box textalign="left">
              좋은 아침, <span>좋은 아침이야,</span> <span>좋은 아침이에요</span>
            </Box>
            <Box alignitems="flex-start">
              Good Morning <span>(informal)</span>
            </Box>
            <PlayBox id="goodMorning" src={goodMorning} />
            <Box>
              좋은 아침입니다
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
            'ㅒ and ㅔ are pronounced with the same sound',
            "ㄹ sounds like an 'l' at the beginning and ending of a word",
            "ㄹ sounds like a 'd' in the middle of a word while surrounded by vowels",
            '조은 아침 is rarely used for "good morning".  Instead you would use the all-purpose: 안영 or 안용하세요'
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
