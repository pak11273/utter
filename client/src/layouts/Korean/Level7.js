import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Audio,
  Box,
  Column,
  Dictionary,
  Img,
  MastheadTitle,
  MastheadSubtitle,
  PlayButton,
  RememberSection,
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
import {Masthead, Navbar} from '../../containers'

import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import sharedPhrases from '../../../src/data/shared/phrases.js'
const anYeong = cdn + sharedPhrases.greetings.hello.korean.informal.audioUrl
const anYeongHaSeYo = cdn + sharedPhrases.greetings.hello.korean.formal.audioUrl
const anYeongHiGyeSeYo =
  cdn + sharedPhrases.greetings.bye.korean.staying.formal.audioUrl
const anYeongHiGaSeYo =
  cdn + sharedPhrases.greetings.bye.korean.leaving.formal.audioUrl

// body parts
import sharedBodyParts from '../../../src/data/shared/bodyParts.js'
const par = cdn + sharedBodyParts.category.nouns.bodyParts.arm.korean.audioUrl
const deung =
  cdn + sharedBodyParts.category.nouns.bodyParts.back.korean.audioUrl
const sinChe =
  cdn + sharedBodyParts.category.nouns.bodyParts.body.korean.audioUrl
const nun = cdn + sharedBodyParts.category.nouns.bodyParts.eye.korean.audioUrl
const bae = cdn + sharedBodyParts.category.nouns.bodyParts.belly.korean.audioUrl
const bar = cdn + sharedBodyParts.category.nouns.bodyParts.foot.korean.audioUrl
const gaSeum =
  cdn + sharedBodyParts.category.nouns.bodyParts.chest.korean.audioUrl
const gui = cdn + sharedBodyParts.category.nouns.bodyParts.ear.korean.audioUrl
const parGgumChi =
  cdn + sharedBodyParts.category.nouns.bodyParts.elbow.korean.audioUrl
const eorGur =
  cdn + sharedBodyParts.category.nouns.bodyParts.face.korean.audioUrl
const sonGaRag =
  cdn + sharedBodyParts.category.nouns.bodyParts.finger.korean.audioUrl
const meoRiKaRag =
  cdn + sharedBodyParts.category.nouns.bodyParts.hair.korean.audioUrl
const son = cdn + sharedBodyParts.category.nouns.bodyParts.hand.korean.audioUrl
const meoRi =
  cdn + sharedBodyParts.category.nouns.bodyParts.head.korean.audioUrl
const muReup =
  cdn + sharedBodyParts.category.nouns.bodyParts.knee.korean.audioUrl
const daRi = cdn + sharedBodyParts.category.nouns.bodyParts.leg.korean.audioUrl
const ib = cdn + sharedBodyParts.category.nouns.bodyParts.mouth.korean.audioUrl
const mog = cdn + sharedBodyParts.category.nouns.bodyParts.neck.korean.audioUrl
const ko = cdn + sharedBodyParts.category.nouns.bodyParts.nose.korean.audioUrl
const barGaRag =
  cdn + sharedBodyParts.category.nouns.bodyParts.toe.korean.audioUrl

// basic words
import sharedVocab from '../../../src/data/shared/vocab.js'
const anI = cdn + sharedVocab.category.nouns.misc.no.해체.audioUrl
const anIYo = cdn + sharedVocab.category.nouns.misc.no.korean.audioUrl
const ye = cdn + sharedVocab.category.nouns.misc.yes.korean.audioUrl
const ne = cdn + sharedVocab.category.nouns.misc.yes.해체.audioUrl
const je = cdn + sharedVocab.category.nouns.speech.pronouns.my.korean.audioUrl
const eun =
  cdn + sharedVocab.category.nouns.speech.participles.은.korean.audioUrl
const neun =
  cdn + sharedVocab.category.nouns.speech.participles.는.korean.audioUrl
const i = cdn + sharedVocab.category.nouns.speech.participles.이.korean.audioUrl
const ga = cdn + sharedVocab.category.nouns.speech.participles.가.korean.audioUrl
const jeo = cdn + sharedVocab.category.nouns.speech.pronouns.I.korean.audioUrl
const na = cdn + sharedVocab.category.nouns.speech.pronouns.I.해체.audioUrl
const haeYoChe =
  cdn +
  sharedVocab.category.cultureSpecific.category.nouns.misc.해요체.korean.audioUrl
const iReum = cdn + sharedVocab.category.nouns.misc.name.korean.audioUrl

// lessons
import lessons from '../../../src/data/korean/level7/examples.js'
const level7_1 = cdn + lessons.category.examples.level7_1.korean.audioUrl
const level7_2 = cdn + lessons.category.examples.level7_2.korean.audioUrl
const level7_3 = cdn + lessons.category.examples.level7_3.korean.audioUrl
const level7_4 = cdn + lessons.category.examples.level7_4.korean.audioUrl
const level7_5 = cdn + lessons.category.examples.level7_5.korean.audioUrl
const level7_6 = cdn + lessons.category.examples.level7_6.korean.audioUrl
const level7_7 = cdn + lessons.category.examples.level7_7.korean.audioUrl
const level7_8 = cdn + lessons.category.examples.level7_8.korean.audioUrl
const level7_9 = cdn + lessons.category.examples.level7_9.korean.audioUrl

class KoreanLevel7 extends Component {
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
              Level Seven - Basic Grammar
            </MastheadTitle>
            <MastheadSubtitle>
              Learn basic expressions to start small conversations.
            </MastheadSubtitle>
          </Box>
        </Masthead>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Greetings{' '}
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              Let's learn some basic introductory phrases. There are several
              different forms to use depending on who you are talking to. We
              will
              be using just two of the most general cases, formal and informal.
              You will generally use the formal form with strangers, people who
              are older, or people who are higher ranked than you. Informal is
              used with friends and relatives. You will learn the more specific
              forms in later lessons.{' '}
            </Text>
          </Box>
        </Section>
        <Section alignitems="flex-start" maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .4fr"
            gridheader640="2.5fr 5.2fr 1fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="0.5fr 1.1fr 0.2fr"
            term="Greetings"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                안영{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                Hello, Good Morning, Good Evening, Bye{' '}
                <span style={{fontSize: '1rem'}}>(informal)</span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="anYeong" src={`${anYeong}`} />
              <PlayButton
                margin="0"
                name="anYeong"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                안영하세요{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                Hello, Good Morning, Good Evening, Bye{' '}
                <span style={{fontSize: '1rem'}}>(formal)</span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="anYeongHaSeYo" src={`${anYeongHaSeYo}`} />
              <PlayButton
                margin="0"
                name="anYeongHaSeYo"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              안영
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              This word has lots of utility. The word literally means 'peace'.
              You can use it to say hello,
              good-morning, good-evening, or good-bye in the informal form. By
              attaching the verb
              하 (do) and the polite ending 세요 to the end of the word you have
              the polite form of saying hello, 안영하세요, which literally means 'Are
              you doing peace?'. Normally you would use intonation(raising your
              voice at the end) to make this a question, but it it commonly not
              intonated.{' '}
            </Text>
          </Box>
        </Section>
        <Section alignitems="flex-start" maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .4fr"
            gridheader640="1fr 2fr .4fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="0.5fr 1.1fr 0.2fr"
            term="Farewells"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                안녕히계세요 <span style={{fontSize: '1rem'}}>(formal)</span>
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                You are leaving and the other person is staying
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="anYeongHiGyeSeYo" src={`${anYeongHiGyeSeYo}`} />
              <PlayButton
                margin="0"
                name="anYeongHiGyeSeYo"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                안녕히 가세요 <span style={{fontSize: '1rem'}}>(formal)</span>
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                You are staying and the other person is leaving{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="anYeongHiGaSeYo" src={`${anYeongHiGaSeYo}`} />
              <PlayButton
                margin="0"
                name="anYeongHiGaSeYo"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section height="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Introductions
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              We are going to deconstruct the following sentences:
            </Text>
          </Box>

          <Box color="black" flexdirection="row" justifycontent="center">
            <Text padding="20px">
              제 이름은 Mary예요.
            </Text>
            <audio id="level7_1" src={`${level7_1}`} />
            <PlayButton
              name="level7_1"
              onClick={this.onClick}
              src={`${PlayImg}`}
            />
          </Box>
          <Box color="black" flexdirection="row" justifycontent="center">
            <Text padding="20px">
              내 이름은 John이에요.
            </Text>
            <audio id="level7_2" src={`${level7_2}`} />
            <PlayButton
              name="level7_2"
              onClick={this.onClick}
              src={`${PlayImg}`}
            />
          </Box>
          <Box color="black" flexdirection="row" justifycontent="center">
            <Text padding="20px">
              나의 이름은 Anna예요.
            </Text>
            <audio id="level7_3" src={`${level7_3}`} />
            <PlayButton
              name="level7_3"
              onClick={this.onClick}
              src={`${PlayImg}`}
            />
          </Box>
          <Box>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              All 3 sentences translate to: My name is ______.
            </Text>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .4fr"
            gridheader640="1fr 2fr .4fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Pronouns"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                내, 나의 <span style={{fontSize: '1rem'}}>(informal)</span>
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                my{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="level7_8" src={`${level7_8}`} />
              <PlayButton
                name="level7_8"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                제 <span style={{fontSize: '1rem'}}>(formal)</span>
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                my{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="level7_7" src={`${level7_7}`} />
              <PlayButton
                name="level7_7"
                onClick={this.onClick}
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
            gridheader="1fr 1fr .4fr"
            gridheader640="1fr 2fr .4fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Nouns"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                이름{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                name{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="iReum" src={`${iReum}`} />
              <PlayButton
                name="iReum"
                onClick={this.onClick}
                src={`${PlayImg}`}
                verticalalign="middle"
              />
            </Box>
          </Dictionary>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .4fr"
            gridheader640="1fr 2fr .4fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Participle"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                이/가 or 은/는
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                subject marker{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="level7_4" src={`${level7_4}`} />
              <PlayButton
                name="level7_4"
                onClick={this.onClick}
                src={`${PlayImg}`}
                verticalalign="middle"
              />
            </Box>
          </Dictionary>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Subject Markers
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              Generally when you introduce a new subject in a conversation you
              will attach an 이/가 subject marker to the end of the word. After
              you start talking about the subject you attach the 은/는 subject
              markers instead. However, normally when you are
              introducing yourself and stating your name, you will want to use
              the 은/는 markers. Choosing between which marker depends on the
              last letter of the subject(받침). If it ends on a vowel you use 가 or
              는. If it ends on a consonant you use 이 or 은.{' '}
            </Text>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .4fr"
            gridheader640="1fr 2fr .4fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Verb"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                이에요/예요
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                is{' '} <span style={{fontSize: '1rem'}}>(formal)</span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="level7_5" src={`${level7_5}`} />
              <PlayButton
                name="level7_5"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                입니다{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                is{' '} <span style={{fontSize: '1rem'}}>(more formal)</span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="level7_9" src={`${level7_9}`} />
              <PlayButton
                name="level7_9"
                onClick={this.onClick}
                src={`${PlayImg}`}
                verticalalign="middle"
              />
            </Box>
          </Dictionary>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Which form of respect do I use?
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              There are many different types of respect forms in Korean. But the
              more common way to introduce yourself to the general public is to
              use the 입니다 ending.{' '}
            </Text>
            <Text fontsize="2rem" margin="60px">
              내 이름은 _____입니다.
            </Text>
            <Subtitle color="#c1c1c1">
              Try and introduce yourself now outloud.
            </Subtitle>
          </Box>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              있다{' '}
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              The verb 있다 conjugates differently depending on the tense and
              formality. In this lesson we will be using the present verb
              tense and the formal politeness level of speech(요). When subjects
              end with a consonant like the name John, you will change 있 to 이에
              then drop the 다 and replace it with 요, then attach it to the end
              of the subject to make one word, John이에요. When the subject ends in
              a vowel like the name Anna, you change 있 to 예 then drop the 다 and
              replace it with 요, then attach it to the end of the subject to
              make one word, Anna예요.
            </Text>
          </Box>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Learning how to describe something with 있.
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              Now that you've learned how to say my(네/나의 or 제) let's learn
              a few words besides name(이름) to combine them with. We'll start by
              learning the the names of basic body parts. Be sure to repeat the
              words slowly after playing the recording. Say it over and over
              again until you can say it at a faster speed.
            </Text>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .5fr"
            gridheader640="1fr 2fr .5fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            height="600px"
            term="Nouns"
            definition="Translation"
            media="Play"
            overflowy="scroll">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                신체
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                body{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="sinChe" src={`${sinChe}`} />
              <PlayButton
                name="sinChe"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                발
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                arm{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="bar" src={`${bar}`} />
              <PlayButton
                name="bar"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                등
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                back{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="deung" src={`${deung}`} />
              <PlayButton
                name="deung"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                눈
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                eye{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="nun" src={`${nun}`} />
              <PlayButton
                name="nun"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                가슴
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                chest{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="gaSeum" src={`${gaSeum}`} />
              <PlayButton
                name="gaSeum"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                귀
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                ear{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="gui" src={`${gui}`} />
              <PlayButton
                name="gui"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                팔꿈치
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                elbow{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="parGgumChi" src={`${parGgumChi}`} />
              <PlayButton
                name="parGgumChi"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                얼굴
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                face{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="eorGur" src={`${eorGur}`} />
              <PlayButton
                name="eorGur"
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                머리카락
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                hair{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="meoRiKaRag" src={`${meoRiKaRag}`} />
              <PlayButton
                name="meoRiKaRag"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                손
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                hand{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="son" src={`${son}`} />
              <PlayButton
                name="son"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                머리
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                head{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="meoRi" src={`${meoRi}`} />
              <PlayButton
                name="meoRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                무릎
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                knee{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="muReup" src={`${muReup}`} />
              <PlayButton
                name="muReup"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                입
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                mouth{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="ib" src={`${ib}`} />
              <PlayButton
                name="ib"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                목
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                neck{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="mog" src={`${mog}`} />
              <PlayButton
                name="mog"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                코
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                nose{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="ko" src={`${ko}`} />
              <PlayButton
                name="ko"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                발가락
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                toe{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="barGaRag" src={`${barGaRag}`} />
              <PlayButton
                name="barGaRag"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                다리
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                leg{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Determiners
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              Let's learn some special pronouns called determiners, so we can
              reference the body parts
              we just learned.
            </Text>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              This(이), That(저 or 그), Thing(것), That thing(이것), That thing(그것 or
              저것)
            </Text>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          margin="100px 0 0 0"
          maxwidth960="1024px">
          <Dictionary
            gridheader="1fr 1fr .5fr"
            gridheader640="1fr 2fr .5fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Pronouns"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                이{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                this{' '}
                <span style={{fontSize: '1rem'}}>
                  (something reachable)
                </span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                저{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                that{' '}
                <span style={{fontSize: '1rem'}}>
                  (far from you and the other person)
                </span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                그{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                that{' '}
                <span style={{fontSize: '1rem'}}>
                  (far from you, but near the other person)(and if the
                  object is not seen)
                </span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
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
            gridheader="1fr 1fr .5fr"
            gridheader640="1fr 2fr .5fr"
            gridbody="2.4fr 2fr 1fr"
            gridbody640="2fr 4fr 1fr"
            term="Nouns"
            definition="Translation"
            media="Play">
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                것{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                thing{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
            <Box alignitems="flex-start">
              <Text padding="0 0 0 20px">
                사람{' '}
              </Text>
            </Box>
            <Box alignitems="flex-start">
              <p>
                person{' '}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="daRi" src={`${daRi}`} />
              <PlayButton
                name="daRi"
                sonGaRag
                onClick={this.onClick}
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section minheight="600px" maxwidth="1024px">
          <Box padding="40px">
            <Subtitle>
              Greetings{' '}
            </Subtitle>
            <Text fontsize="1.5rem" lineheight="2.5rem" margin="20px 0 0 0">
              As a determiner you add 이,그, or 저 to the left of the noun. eg.
              this thing is an arm(이거 팔이여요). This thing is used when you have
              something that is within
              your reach. 저 is used when things are far away from you and the
              person
              you are talking to, while 그 is used when it's far away from you
              but near the person you are speaking to. You might be wondering
              about using "the" or "a" in Korean, but in Korean there are no
              such articles. So "the boy" or "a boy" is simply "boy"

              이것이 저것보다 좋아요
              이거는 저거보다 좋네요

              이게 is short for 이것이
              이것이 저거보다 좋아요 = 이게 저거보다 좋아요

            </Text>
          </Box>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Box padding="40px">
              <Subtitle>
                What you should know{' '}
              </Subtitle>
              <Text lineheight="3rem">
                Some things you should be able to utter now.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Examples{' '}
                </Th>
                <Th width="50%">
                  Translation
                </Th>
                <Th width="20%">
                  Play
                </Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    것{' '}
                  </Td>
                  <Td>
                    thing{' '}
                    <span style={{fontSize: '1rem'}}>
                      (something reachable)
                    </span>

                  </Td>
                  <Td>
                    <audio id="daRi" src={`${daRi}`} />
                    <PlayButton
                      name="daRi"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <RememberSection
          list={[
            'All sentences end in either a verb or adjective.',
            'Generally speaking, you will be using 내 instead of 제 and 나의 is not often used.',
            '이것 and 이거 are pronounced the same.'
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

export default KoreanLevel7
