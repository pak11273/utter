import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Audio,
  Box,
  Column,
  Img,
  MastheadTitle,
  MastheadSubtitle,
  PlayButton,
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

import source from '../../../src/data/level7/vocab.js'
const anYeong = cdn + source.category.nouns.misc.hello.해체.audioUrl
const anYeongHaSeYo = cdn + source.category.nouns.misc.hello.해요체.audioUrl
const anYeongHiGyeSeYo = cdn + source.category.nouns.misc.bye1.해요체.audioUrl
const anYeongHiGaSeYo = cdn + source.category.nouns.misc.bye2.해요체.audioUrl

// body parts
const par = cdn + source.category.nouns.bodyParts.arm.korean.audioUrl
const deung = cdn + source.category.nouns.bodyParts.back.korean.audioUrl
const sinChe = cdn + source.category.nouns.bodyParts.body.korean.audioUrl
const nun = cdn + source.category.nouns.bodyParts.eye.korean.audioUrl
const bae = cdn + source.category.nouns.bodyParts.belly.korean.audioUrl
const bar = cdn + source.category.nouns.bodyParts.foot.korean.audioUrl
const gaSeum = cdn + source.category.nouns.bodyParts.chest.korean.audioUrl
const gui = cdn + source.category.nouns.bodyParts.ear.korean.audioUrl
const parGgumChi = cdn + source.category.nouns.bodyParts.elbow.korean.audioUrl
const eorGur = cdn + source.category.nouns.bodyParts.face.korean.audioUrl
const sonGaRag = cdn + source.category.nouns.bodyParts.finger.korean.audioUrl
const meoRiKaRag = cdn + source.category.nouns.bodyParts.hair.korean.audioUrl
const son = cdn + source.category.nouns.bodyParts.hand.korean.audioUrl
const meoRi = cdn + source.category.nouns.bodyParts.head.korean.audioUrl
const muReup = cdn + source.category.nouns.bodyParts.knee.korean.audioUrl
const daRi = cdn + source.category.nouns.bodyParts.leg.korean.audioUrl
const ib = cdn + source.category.nouns.bodyParts.mouth.korean.audioUrl
const mog = cdn + source.category.nouns.bodyParts.neck.korean.audioUrl
const ko = cdn + source.category.nouns.bodyParts.nose.korean.audioUrl
const balGaRag = cdn + source.category.nouns.bodyParts.toe.korean.audioUrl

const anI = cdn + source.category.nouns.misc.no.해체.audioUrl
const anIYo = cdn + source.category.nouns.misc.no.korean.audioUrl
const ye = cdn + source.category.nouns.misc.yes.korean.audioUrl
const ne = cdn + source.category.nouns.misc.yes.해체.audioUrl
const je = cdn + source.category.nouns.speech.pronouns.my.korean.audioUrl
const eun = cdn + source.category.nouns.speech.participles.은.korean.audioUrl
const neun = cdn + source.category.nouns.speech.participles.는.korean.audioUrl
const i = cdn + source.category.nouns.speech.participles.이.korean.audioUrl
const ga = cdn + source.category.nouns.speech.participles.가.korean.audioUrl
const jeo = cdn + source.category.nouns.speech.pronouns.I.korean.audioUrl
const na = cdn + source.category.nouns.speech.pronouns.I.해체.audioUrl
const haeYoChe =
  cdn + source.category.cultureSpecific.category.nouns.misc.해요체.korean.audioUrl
const iReum = cdn + source.category.nouns.misc.name.korean.audioUrl

// phrases
const level7_1 = cdn + source.category.examples.level7_1.korean.audioUrl
const level7_2 = cdn + source.category.examples.level7_2.korean.audioUrl
const level7_3 = cdn + source.category.examples.level7_3.korean.audioUrl
const level7_4 = cdn + source.category.examples.level7_4.korean.audioUrl
const level7_5 = cdn + source.category.examples.level7_5.korean.audioUrl
const level7_6 = cdn + source.category.examples.level7_6.korean.audioUrl

class KoreanLevel7 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead background="gray">
          <Column>
            <Box>
              <MastheadTitle>
                Level Seven - Basic Grammar
              </MastheadTitle>
              <MastheadSubtitle>
                Greeting other people and simple expressions
              </MastheadSubtitle>
            </Box>
          </Column>
        </Masthead>
        <Section maxwidth="960px">
          <Column>
            <Box padding="40px">
              <Subtitle>
                Greetings{' '}
              </Subtitle>
              <Text lineheight="3rem">
                Let's learn how to say "Hello" and "GoodBye".
              </Text>
            </Box>
            <Box color="black" overflowx="auto">
              <Table verticalalign="middle">
                <Thead>
                  <Th width="18%">
                    Greeting{' '}
                  </Th>
                  <Th width="28%">
                    Translation
                  </Th>
                  <Th width="10%">
                    Play
                  </Th>
                </Thead>
                <tbody>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      안영 <span style={{fontSize: '1rem'}}>(informal)</span>
                    </Td>
                    <Td>
                      Hello, Good Morning, Good Evening, Bye{' '}
                      <span style={{fontSize: '1rem'}}>
                        (when speaking to friends, relatives, or children)
                      </span>
                    </Td>
                    <Td>
                      <audio id="anYeong" src={`${anYeong}`} />
                      <PlayButton
                        margin="0"
                        name="anYeong"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      안영하세요 <span style={{fontSize: '1rem'}}>(formal)</span>
                    </Td>
                    <Td>
                      Hello, Good Morning, Good Evening, Bye{' '}
                      <span style={{fontSize: '1rem'}}>
                        (when speaking to elders, superiors, or strangers)
                      </span>
                    </Td>
                    <Td>
                      <audio id="anYeongHaSeYo" src={`${anYeongHaSeYo}`} />
                      <PlayButton
                        margin="0"
                        name="anYeongHaSeYo"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                </tbody>
              </Table>
            </Box>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Subtitle>
              안영
            </Subtitle>
            <Text lineheight="3rem">
              This word has lots of utility. The word literally means 'peace'.
              You can use it to say hello,
              good-morning, good-evening, or good-bye. By attaching the verb
              하(do) and the polite ending 세요 to the end of the word you have
              the polite form of saying hello, 안영하세요, which literally means 'Are
              you at peace?'
            </Text>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Column>
              <Box color="black" overflowx="auto">
                <Table verticalalign="middle">
                  <Thead>
                    <Th width="40%">
                      Farewells{' '}
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
                        안녕히 계세요 <span style={{fontSize: '1rem'}}>(formal)</span>
                      </Td>
                      <Td>
                        You are leaving and the other person is staying
                      </Td>
                      <Td>
                        <audio
                          id="anYeongHiGyeSeYo"
                          src={`${anYeongHiGyeSeYo}`}
                        />
                        <PlayButton
                          name="anYeongHiGyeSeYo"
                          onClick={this.onClick}
                          src={`${PlayImg}`}
                        />
                      </Td>
                    </Tr>
                    <Tr
                      borderbottom="1px solid #333"
                      fontsize="1rem"
                      height="80px">
                      <Td>
                        안녕히 가세요 <span style={{fontSize: '1rem'}}>(formal)</span>
                      </Td>
                      <Td>
                        You are staying and the other person is leaving{' '}
                      </Td>
                      <Td>
                        <audio
                          id="anYeongHiGaSeYo"
                          src={`${anYeongHiGaSeYo}`}
                        />
                        <PlayButton
                          name="anYeongHiGaSeYo"
                          onClick={this.onClick}
                          src={`${PlayImg}`}
                        />
                      </Td>
                    </Tr>
                  </tbody>
                </Table>
              </Box>
            </Column>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Box>
              <Subtitle>
                Introductions
              </Subtitle>
              <Text lineheight="3rem">
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
            <Text padding="20px">
              All 3 sentences translate to:
            </Text>
            <Text>
              My name is ______.
            </Text>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Pronouns{' '}
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
                    내, 나의 <span style={{fontSize: '1rem'}}>(informal)</span>
                  </Td>
                  <Td>
                    my{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to friends, relatives, or children)
                    </span>
                  </Td>
                  <Td>
                    <audio id="level7_6" src={`${level7_6}`} />
                    <PlayButton
                      name="level7_6"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    제 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    my{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="je" src={`${je}`} />
                    <PlayButton
                      name="je"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Nouns{' '}
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
                    이름{' '}
                  </Td>
                  <Td>
                    name{' '}
                  </Td>
                  <Td>
                    <audio id="iReum" src={`${iReum}`} />
                    <PlayButton
                      name="iReum"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Box color="black" overflowx="auto" margin="30px">
              <Table verticalalign="middle">
                <Thead>
                  <Th width="30%">
                    Participle{' '}
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
                      이/가 or 은/는
                    </Td>
                    <Td>
                      subject marker{' '}
                    </Td>
                    <Td>
                      <audio id="level7_4" src={`${level7_4}`} />
                      <PlayButton
                        name="level7_4"
                        onClick={this.onClick}
                        src={`${PlayImg}`}
                        verticalalign="middle"
                      />
                    </Td>
                  </Tr>
                </tbody>
              </Table>
            </Box>
            <Box>
              <Text lineheight="3rem">
                Generally speaking, you will be using 내 instead of 제 and 나의 is
                not often used.
              </Text>
            </Box>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Column>
              <Subtitle>
                Subject Markers
              </Subtitle>
              <Text lineheight="3rem">
                Generally when you introduce a new subject in a conversation you
                will attach an 이/가 subject marker to the end of the word. After
                you start talking about the subject you attach the 은/는 subject
                markers instead. However, normally when you are
                introducing yourself and stating your name, you will want to use
                the 은/는 markers. Choosing between which marker depends on the
                last letter of the subject. If it ends on a vowel you use 가 or
                는. If it ends on a consonant you use 이 or 은.{' '}
              </Text>
            </Column>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Box color="black" overflowx="auto">
              <Table verticalalign="middle">
                <Thead>
                  <Th width="50%">
                    Verb + Politeness{' '}
                  </Th>
                  <Th width="30%">
                    Translation
                  </Th>
                  <Th width="20%">
                    Play
                  </Th>
                </Thead>
                <tbody>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      이에요/예요
                    </Td>
                    <Td>
                      is{' '}
                    </Td>
                    <Td>
                      <audio id="level7_5" src={`${level7_5}`} />
                      <PlayButton
                        name="level7_5"
                        onClick={this.onClick}
                        src={`${PlayImg}`}
                        verticalalign="middle"
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      입니다{' '}
                      <span style={{fontSize: '1rem'}}>(higher respect)</span>

                    </Td>
                    <Td>
                      is{' '}
                    </Td>
                    <Td>
                      <audio id="level7_6" src={`${level7_6}`} />
                      <PlayButton
                        name="level7_6"
                        onClick={this.onClick}
                        src={`${PlayImg}`}
                        verticalalign="middle"
                      />
                    </Td>
                  </Tr>
                </tbody>
              </Table>
            </Box>
            <Box margin="50px 0 0 0">
              <Text lineheight="3rem">
                Which form of respect do I use? There are many different types
                of
                respect forms in Korean. But the more common way to introduce
                yourself to the general public is to use the 입니다 form.{' '}
              </Text>
              <Text margin="60px 0 0 0">
                내 이름은 _____입니다.
              </Text>
            </Box>
            <Subtitle color="#c1c1c1">
              Try and introduce yourself now outloud.
            </Subtitle>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Subtitle color="#ff0000">
              Rule: All sentences end in either a verb or adjective.
            </Subtitle>
            <Subtitle>
              있다{' '}
            </Subtitle>
            <Text lineheight="3rem">
              The verb 있다 conjugates differently depending on the tense and
              formality. In this lesson we will be using the present verb
              tense and the most common politeness level of speech, 해요체{' '}
              <audio id="haeYoChe" src={`${haeYoChe}`} />
              <PlayButton
                name="haeYoChe"
                onClick={this.onClick}
                padding="2px 0 0 0"
                position="absolute"
                src={`${PlayImg}`}
              />
              <Spacer display="inline-block" margin="0 40px 0 0" /> You use
              this type of politeness towards strangers, elders, and people of
              authority. Generally you just attach 요 to the end of a verb.
              When
              subjects
              end with a consonant like the name John, you will change 있 to 이에
              then drop the 다 and
              replace it with 요, then attach it to the end of the subject to
              make one word, John이에요. When the subject ends in a vowel like
              the name Anna, you change 있 to 예 then drop the 다 and replace it
              with 요, then attach it to the end of the subject to make one
              word, Anna예요.
            </Text>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Column>
            <Subtitle>
              Learning how to describe something with 있.
            </Subtitle>
            <Text lineheight="3rem">
              Now that you've learned how to say my(네/나의 or 제) let's learn
              a few words besides name(이름) to combine them with. We'll start by
              learning the the names of basic body parts. Be sure to repeat the
              words slowly after playing the recording. Say it over and over
              again until you can say it at a faster speed.
            </Text>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Nouns{' '}
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
                    신체
                  </Td>
                  <Td>
                    body{' '}
                  </Td>
                  <Td>
                    <audio id="sinChe" src={`${sinChe}`} />
                    <PlayButton
                      name="sinChe"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    발
                  </Td>
                  <Td>
                    arm{' '}
                  </Td>
                  <Td>
                    <audio id="par" src={`${par}`} />
                    <PlayButton
                      name="par"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    등
                  </Td>
                  <Td>
                    back{' '}
                  </Td>
                  <Td>
                    <audio id="deung" src={`${deung}`} />
                    <PlayButton
                      name="deung"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    눈
                  </Td>
                  <Td>
                    eye{' '}
                  </Td>
                  <Td>
                    <audio id="nun" src={`${nun}`} />
                    <PlayButton
                      name="nun"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    가슴
                  </Td>
                  <Td>
                    chest{' '}
                  </Td>
                  <Td>
                    <audio id="gaSeum" src={`${gaSeum}`} />
                    <PlayButton
                      name="gaSeum"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    귀
                  </Td>
                  <Td>
                    ear{' '}
                  </Td>
                  <Td>
                    <audio id="gui" src={`${gui}`} />
                    <PlayButton
                      name="gui"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    팔꿈치
                  </Td>
                  <Td>
                    elbow{' '}
                  </Td>
                  <Td>
                    <audio id="parGgumChi" src={`${parGgumChi}`} />
                    <PlayButton
                      name="parGgumChi"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    얼굴
                  </Td>
                  <Td>
                    face{' '}
                  </Td>
                  <Td>
                    <audio id="eorGur" src={`${eorGur}`} />
                    <PlayButton
                      name="eorGur"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    머리카락
                  </Td>
                  <Td>
                    hair{' '}
                  </Td>
                  <Td>
                    <audio id="meoRiKaRag" src={`${meoRiKaRag}`} />
                    <PlayButton
                      name="meoRiKaRag"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    손
                  </Td>
                  <Td>
                    hand{' '}
                  </Td>
                  <Td>
                    <audio id="son" src={`${son}`} />
                    <PlayButton
                      name="son"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    머리
                  </Td>
                  <Td>
                    head{' '}
                  </Td>
                  <Td>
                    <audio id="meoRi" src={`${meoRi}`} />
                    <PlayButton
                      name="meoRi"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    무릎
                  </Td>
                  <Td>
                    knee{' '}
                  </Td>
                  <Td>
                    <audio id="muReup" src={`${muReup}`} />
                    <PlayButton
                      name="muReup"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    입
                  </Td>
                  <Td>
                    mouth{' '}
                  </Td>
                  <Td>
                    <audio id="ib" src={`${ib}`} />
                    <PlayButton
                      name="ib"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    목
                  </Td>
                  <Td>
                    neck{' '}
                  </Td>
                  <Td>
                    <audio id="mog" src={`${mog}`} />
                    <PlayButton
                      name="mog"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    코
                  </Td>
                  <Td>
                    nose{' '}
                  </Td>
                  <Td>
                    <audio id="ko" src={`${ko}`} />
                    <PlayButton
                      name="ko"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    발가락
                  </Td>
                  <Td>
                    toe{' '}
                  </Td>
                  <Td>
                    <audio id="balGaRag" src={`${balGaRag}`} />
                    <PlayButton
                      name="balGaRag"
                      sonGaRag
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    다리
                  </Td>
                  <Td>
                    leg{' '}
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
        <Section maxwidth="960px">
          <Column>
            <Subtitle>
              Determiners
            </Subtitle>
            <Text lineheight="2.5rem">
              Let's learn some other pronouns to modify the nouns we just
              learned.{' '}
            </Text>
            <Text lineheight="2.5rem">
              This, That, That thing, This thing, he, his, she, her,{' '}
              이, 그, 것, 이것, 그것, 저것{' '}
            </Text>
          </Column>
        </Section>
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Pronoun/Determiner{' '}
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
                    이{' '}
                  </Td>
                  <Td>
                    this{' '}
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
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    저{' '}
                  </Td>
                  <Td>
                    that{' '}
                    <span style={{fontSize: '1rem'}}>
                      (far from you and the other person)
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
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    그{' '}
                  </Td>
                  <Td>
                    that{' '}
                    <span style={{fontSize: '1rem'}}>
                      (far from you, but near the other person)(and if the
                      object is not seen)
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
        <Section maxwidth="960px">
          <Box color="black" overflowx="auto" margin="30px">
            <Table verticalalign="middle">
              <Thead>
                <Th width="30%">
                  Noun{' '}
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
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    사람{' '}
                  </Td>
                  <Td>
                    person{' '}
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
        <Section maxwidth="960px">
          <Column>
            <Text lineheight="3rem">
              As a determiner you add 이,그,저 to the left of the noun. eg.
              determiner = (이그 is mine)this thing is an arm. This can be used as
              a
              pronoun or as a determiner. pronoun = this is
              my car. This thing is used when you have something that is within
              your
              reach. 저 is used when things are far away from you and the person
              you are talking to, while 그 is used when it's far away from you
              but near the person you are speaking to. You might be wondering
              about using (the or a) in Korean, but in Korean there are no such
              articles. So "the boy or a boy" is simply "boy"
              이것 is not pronounced iGeot, but rather iGeo

              Imho, they means basically the same things. 이거 simply means "this"
              and 이것 means "this one".

              이것이 저것보다 좋아요
              이거는 저거보다 좋네요

              이게 is short for 이것이
              이것이 저거보다 좋아요 = 이게 저거보다 좋아요

            </Text>
          </Column>
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
      </Wrapper>
    )
  }
}

export default KoreanLevel7
