import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
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
} from '../../../components'

import {Info, Masthead} from '../components'
import PlayImg from '../../../assets/images/play.svg'

// fetch level 1 vocabulary and store in redux
import actionCreators from '../../Admin/Vocabulary/actions.js'
import fetchWords from '../../Admin/Vocabulary/actions.js'

// cdn
import cdnUrl from '../../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import sharedPhrases from '../../../../src/data/shared/phrases.js'

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
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.fetchWords().then(res => {
      this.assignStateProps()
    })
  }

  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }

  assignStateProps = e => {
    let words = this.props.vocabReducer
    var val =
      words[
        (function() {
          for (var item in words) return item
        })()
      ]
    val.words.map(item => {
      let {name, audioUrl} = item
      this.setState({
        [item.word]: cdn + audioUrl
      })
    })
  };

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
            gridheader640=".9fr .8fr 2.5fr .7fr"
            gridbody=".9fr .8fr 2.5fr .5fr"
            gridbody640=".9fr .8fr 2.5fr .5fr"
            height="600px"
            term="Consonants"
            definition="Pronunciation"
            media="Play"
            name="Name"
            width="100vw"
            overflowy="scroll">
            <Box>ㄱ </Box>
            <Box alignitems="flex-start">기역</Box>
            <Box alignitems="flex-start">
              <p>a non-aspirated 'k' sound. Almost like a 'g' sound</p>
            </Box>
            <PlayBox id="ㄱ" src={this.state.ㄱ} />
            <Box>ㄲ </Box>
            <Box alignitems="flex-start">쌍기역</Box>
            <Box alignitems="flex-start">
              <p>a 'g' sound formed from the throat</p>
            </Box>
            <PlayBox id="ㄲ" src={this.state.ㄲ} />
            <Box>ㄴ</Box>
            <Box alignitems="flex-start">니은</Box>
            <Box alignitems="flex-start">
              <p>
                'n' sound as in <span style={{color: 'red'}}>n</span>ame
              </p>
            </Box>
            <PlayBox id="ㄴ" src={this.state.ㄴ} />
            <Box>ㄷ</Box>
            <Box alignitems="flex-start">디귿</Box>
            <Box alignitems="flex-start">
              <p>a non-aspirated 't' sound</p>
            </Box>
            <PlayBox id="ㄷ" src={this.state.ㄷ} />
            <Box>ㄸ</Box>
            <Box alignitems="flex-start">쌍디귿</Box>
            <Box alignitems="flex-start">
              <p>
                'th' sound as in <span style={{color: 'red'}}>th</span>ing
              </p>
            </Box>
            <PlayBox id="ㄸ" src={this.state.ㄸ} />
            <Box>ㄹ </Box>
            <Box alignitems="flex-start">리을</Box>
            <Box alignitems="flex-start">
              <p>an 'l' like sound or 'd' sound depending on position</p>
            </Box>
            <PlayBox id="ㄹ" src={this.state.ㄹ} />
            <Box>ㅁ </Box>
            <Box alignitems="flex-start">미음</Box>
            <Box alignitems="flex-start">
              <p>
                'm' sound as in <span style={{color: 'red'}}>m</span>om
              </p>
            </Box>
            <PlayBox id="ㅁ" src={this.state.ㅁ} />
            <Box>ㅂ </Box>
            <Box alignitems="flex-start">비읍</Box>
            <Box alignitems="flex-start">
              <p>a non-aspirated 'p' sound</p>
            </Box>
            <PlayBox id="ㅂ" src={this.state.ㅂ} />
            <Box>ㅃ</Box>
            <Box alignitems="flex-start">쌍비읍</Box>
            <Box alignitems="flex-start">
              a 'b' sound formed from the throat
            </Box>
            <PlayBox id="ㅃ" src={this.state.ㅃ} />
            <Box>ㅅ </Box>
            <Box alignitems="flex-start">시옷</Box>
            <Box alignitems="flex-start">
              <p>
                a soft 's' sound as in <span style={{color: 'red'}}>s</span>oft
              </p>
            </Box>
            <PlayBox id="ㅅ" src={this.state.ㅅ} />
            <Box>ㅆ</Box>
            <Box alignitems="flex-start">쌍시옷</Box>
            <Box alignitems="flex-start">
              <p>
                's' sound as in <span style={{color: 'red'}}>s</span>ell
              </p>
            </Box>
            <PlayBox id="ㅆ" src={this.state.ㅆ} />
            <Box>ㅇ </Box>
            <Box alignitems="flex-start">이응</Box>
            <Box alignitems="flex-start">
              <p>
                'ng' sound as in so<span style={{color: 'red'}}>ng</span> or is
                silent
              </p>
            </Box>
            <PlayBox id="ㅇ" src={this.state.ㅇ} />
            <Box>ㅈ</Box>
            <Box alignitems="flex-start">지웃</Box>
            <Box alignitems="flex-start">
              <p>a non-aspirated 'ch' sound</p>
            </Box>
            <PlayBox id="ㅈ" src={this.state.ㅈ} />
            <Box>ㅉ </Box>
            <Box alignitems="flex-start">쌍지읒</Box>
            <Box alignitems="flex-start">
              <p>'j' sound from the throat</p>
            </Box>
            <PlayBox id="ㅉ" src={this.state.ㅉ} />
            <Box>ㅊ </Box>
            <Box alignitems="flex-start">치읓</Box>
            <Box alignitems="flex-start">
              <p>
                'ch' sound as in <span style={{color: 'red'}}>ch</span>air{' '}
              </p>
            </Box>
            <PlayBox id="ㅊ" src={this.state.ㅊ} />
            <Box>ㅋ</Box>
            <Box alignitems="flex-start">키읔</Box>
            <Box alignitems="flex-start">
              <p>
                'k' sound as in <span style={{color: 'red'}}>k</span>ite
              </p>
            </Box>
            <PlayBox id="ㅋ" src={this.state.ㅋ} />
            <Box>ㅌ </Box>
            <Box alignitems="flex-start">티읕</Box>
            <Box alignitems="flex-start">
              <p>
                't' sound as in <span style={{color: 'red'}}>t</span>ime
              </p>
            </Box>
            <PlayBox id="ㅌ" src={this.state.ㅌ} />
            <Box>ㅍ</Box>
            <Box alignitems="flex-start">피읖</Box>
            <Box alignitems="flex-start">
              <p>
                'p' sound as in <span style={{color: 'red'}}>p</span>ig
              </p>
            </Box>
            <PlayBox id="ㅍ" src={this.state.ㅍ} />
            <Box>ㅎ</Box>
            <Box alignitems="flex-start">히읗</Box>
            <Box alignitems="flex-start">
              <p>
                'h' sound as in <span style={{color: 'red'}}>h</span>at
              </p>
            </Box>
            <PlayBox id="ㅎ" src={this.state.ㅎ} />
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
            <Box>ㅏ</Box>
            <Box alignitems="flex-start">'ah' sound</Box>
            <PlayBox id="ㅏ" src={this.state.ㅏ} />
            <Box>ㅑ</Box>
            <Box alignitems="flex-start">'yah' sound</Box>
            <PlayBox id="ㅑ" src={this.state.ㅑ} />
            <Box>ㅓ</Box>
            <Box alignitems="flex-start">in between 'uh' and 'oh' sound</Box>
            <PlayBox id="ㅓ" src={this.state.ㅓ} />
            <Box>ㅕ</Box>
            <Box alignitems="flex-start">in between 'yuh' and 'yoh' sound</Box>
            <PlayBox id="ㅕ" src={this.state.ㅕ} />
            <Box>ㅗ</Box>
            <Box alignitems="flex-start">
              <p>
                'o' sound as in d<span style={{color: 'red'}}>ough</span>nut
              </p>
            </Box>
            <PlayBox id="ㅗ" src={this.state.ㅗ} />
            <Box>ㅛ</Box>
            <Box alignitems="flex-start">
              <p>
                'yo' sound as in <span style={{color: 'red'}}>yo yo</span>
              </p>
            </Box>
            <PlayBox id="ㅛ" src={this.state.ㅛ} />
            <Box>ㅜ</Box>
            <Box alignitems="flex-start">
              <p>
                'ew' sound as in sh<span style={{color: 'red'}}>oe</span>
              </p>
            </Box>
            <PlayBox id="ㅜ" src={this.state.ㅜ} />
            <Box>ㅠ</Box>
            <Box alignitems="flex-start">
              <p>
                'you' sound as in <span style={{color: 'red'}}>you</span>
              </p>
            </Box>
            <PlayBox id="ㅠ" src={this.state.ㅠ} />
            <Box>ㅡ</Box>
            <Box alignitems="flex-start">
              <p>
                'eu' sound as in l<span style={{color: 'red'}}>oo</span>k
              </p>
            </Box>
            <PlayBox id="ㅡ" src={this.state.ㅡ} />
            <Box>ㅣ</Box>
            <Box alignitems="flex-start">
              <p>
                'e' sound as in e<span style={{color: 'red'}}>at</span>
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
          </Dictionary>
        </Section>
        <Info
          subtitle="Two letter Syllables (under construction)"
          info="You can combine consonants and syllables to make two letter syllables. Some examples below are provided. Consonants go first then the vowel is placed to the right.  The consonant ㅇ is silent when it is placed at the beginning of a syllable."
        />
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader=".9fr 2fr .9fr"
            gridheader640=".9fr 2.5fr .5fr"
            gridbody=".9fr 2.5fr .5fr"
            gridbody640=".9fr 2.5fr .5fr"
            height="600px"
            term="Syllables"
            definition="Pronunciation"
            media="Play"
            overflowy="scroll">
            <Box>가 </Box>
            <Box alignitems="flex-start">
              <p>
                'ga' sound as in <span style={{color: 'red'}}>ga ga</span>
              </p>
            </Box>
            <PlayBox id="ㅡ" src={this.state.ㅡ} />
            <Box>나 </Box>
            <Box alignitems="flex-start">
              <p>
                'na' sound as in <span style={{color: 'red'}}>no</span>t
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>다 </Box>
            <Box alignitems="flex-start">
              <p>
                'da' sound as in <span style={{color: 'red'}}>daugh</span>ter
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>라 </Box>
            <Box alignitems="flex-start">
              <p>
                'ra' sound as in <span style={{color: 'red'}}>ro</span>ck
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>마 </Box>
            <Box alignitems="flex-start">
              <p>
                'ma' sound as in <span style={{color: 'red'}}>ma</span> ma
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>바 </Box>
            <Box alignitems="flex-start">
              <p>
                'ba' sound as in <span style={{color: 'red'}}>ba</span>
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>사 </Box>
            <Box alignitems="flex-start">
              <p>
                'sa' sound as in <span style={{color: 'red'}}>sa</span>
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>아 </Box>
            <Box alignitems="flex-start">
              <p>
                'a' sound as in <span style={{color: 'red'}}>au</span>tumn
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>자 </Box>
            <Box alignitems="flex-start">
              <p>
                'ja' sound as in <span style={{color: 'red'}}>jo</span>lly
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>차 </Box>
            <Box alignitems="flex-start">
              <p>
                'cha' sound as in <span style={{color: 'red'}}>cha</span>
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>카 </Box>
            <Box alignitems="flex-start">
              <p>
                'ca' sound as in <span style={{color: 'red'}}>caugh</span>t
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>타 </Box>
            <Box alignitems="flex-start">
              <p>
                'ta' sound as in <span style={{color: 'red'}}>taugh</span>t
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>파 </Box>
            <Box alignitems="flex-start">
              <p>
                'pa' sound as in <span style={{color: 'red'}}>po</span>nd
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
            <Box>하 </Box>
            <Box alignitems="flex-start">
              <p>
                'ha' sound as in <span style={{color: 'red'}}>ha</span>ll
              </p>
            </Box>
            <PlayBox id="ㅣ" src={this.state.ㅣ} />
          </Dictionary>
        </Section>
        <Info
          subtitle="Greetings"
          info="Let's learn some basic introductory phrases. There are several different forms to use depending on who you are talking to. We will be using just two of the most general cases, formal and informal.  You will generally use the formal form with strangers, people who are older, or people who are higher ranked than you. Informal is used with friends and relatives. You will learn the more specific forms in later lessons."
        />
        <Section alignitems="flex-start" margin="100px 0 0 0" maxwidth="1024px">
          <Dictionary
            gridheader=".9fr 2fr .9fr"
            gridheader640=".9fr 2.5fr .5fr"
            gridbody=".9fr 2.5fr .5fr"
            gridbody640=".9fr 2.5fr .5fr"
            term="Phrases"
            definition="Pronunciation"
            media="Play">
            <Box>안영</Box>
            <Box alignitems="flex-start">
              Hello <span>(informal)</span>
            </Box>
            <PlayBox id="hello" src={hello} />
            <Box>안영하세요</Box>
            <Box alignitems="flex-start">
              Hello <span>(formal)</span>
            </Box>
            <PlayBox id="helloFormal" src={helloFormal} />
            <Box>안영</Box>
            <Box alignitems="flex-start">
              Bye <span>(informal)</span>
            </Box>
            <PlayBox id="hello" src={hello} />
            <Box>안영히계세요</Box>
            <Box alignitems="flex-start">
              Bye <span>(formal, to someone who is staying behind)</span>
            </Box>
            <PlayBox id="byeStaying" src={byeStaying} />
            <Box>안영히가세요</Box>
            <Box alignitems="flex-start">
              Bye <span>(formal, to someone who is going away)</span>
            </Box>
            <PlayBox id="byeLeaving" src={byeLeaving} />
            <Box textalign="left">
              좋은 아침, <span>좋은 아침이야,</span>{' '}
              <span>좋은 아침이에요</span>
            </Box>
            <Box alignitems="flex-start">
              Good Morning <span>(informal)</span>
            </Box>
            <PlayBox id="goodMorning" src={goodMorning} />
            <Box>좋은 아침입니다</Box>
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

const mapStateToProps = state => {
  return {
    vocabReducer: state.vocabReducer
  }
}

const mapDispatchToProps = dispatch => {
  let fetchWords = actionCreators.fetch
  return {
    actions: bindActionCreators(
      {
        fetchWords
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KoreanLevel1)
