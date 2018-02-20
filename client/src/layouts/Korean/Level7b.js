import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Audio,
  Box,
  Column,
  Img,
  Masthead,
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

import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import source from '../../../src/data/level7/vocab.js'
const anI = cdn + source.category.nouns.misc.no.해체.audioUrl
const anIYo = cdn + source.category.nouns.misc.no.korean.audioUrl
const ge = cdn + source.category.nouns.animals.dog.korean.audioUrl
const goYangI = cdn + source.category.nouns.animals.cat.korean.audioUrl
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
  cdn +
  source.category.cultureSpecific.category.nouns.misc.해요체.korean.audioUrl
const sangJa = cdn + source.category.nouns.misc.box.korean.audioUrl
const kub = cdn + source.category.nouns.kitchen.cup.korean.audioUrl
const jeonHoa = cdn + source.category.nouns.bedroom.telephone.korean.audioUrl
const deuReSeu = cdn + source.category.nouns.clothes.dress.korean.audioUrl
const iReum = cdn + source.category.nouns.misc.name.korean.audioUrl
const meog = cdn + source.category.verbs.eat.korean.audioUrl
const ddaeRi = cdn + source.category.verbs.hit.korean.audioUrl
const us = cdn + source.category.verbs.laugh.korean.audioUrl
const ja = cdn + source.category.verbs.sleep.korean.audioUrl

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
        <Masthead
          background="#666"
          height="450px"
          height768="300px"
          padding="30px"
          textalign="left">
          <Box justifycontent="center" width960="1024px">
            <Title color="white" fontsize="3rem" padding="20px">
              Level Seven - Basic Grammar
            </Title>
            <Subtitle color="#bbb" fontsize="2rem" textalign="left">
              In this lesson you will learn simple grammar to form simple
              sentences.
            </Subtitle>
          </Box>
        </Masthead>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="530px"
          height960="530px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Box padding="40px">
                <Subtitle
                  color="#333"
                  margin="70px 0 0 0"
                  padding="1rem"
                  fontsize="2rem"
                  fontweight="600">
                  Greetings{' '}
                </Subtitle>
                <Text>Let's learn how to say "Hello".</Text>
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">안영하세요</Text>
                <audio id="level7_1" src={`${level7_1}`} />
                <PlayButton
                  name="level7_1"
                  onClick={this.onClick}
                  src={`${PlayImg}`}
                />
              </Box>
              <Text padding="20px">All 3 sentences translate to:</Text>
              <Text>My name is ______.</Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="530px"
          height960="530px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Box padding="40px">
                <Subtitle
                  color="#333"
                  margin="70px 0 0 0"
                  padding="1rem"
                  fontsize="2rem"
                  fontweight="600">
                  Introductions
                </Subtitle>
                <Text>
                  We are going to deconstruct the following sentences:
                </Text>
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">제 이름은 Mary예요.</Text>
                <audio id="level7_1" src={`${level7_1}`} />
                <PlayButton
                  name="level7_1"
                  onClick={this.onClick}
                  src={`${PlayImg}`}
                />
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">내 이름은 John이에요.</Text>
                <audio id="level7_2" src={`${level7_2}`} />
                <PlayButton
                  name="level7_2"
                  onClick={this.onClick}
                  src={`${PlayImg}`}
                />
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">나의 이름은 Anna예요.</Text>
                <audio id="level7_3" src={`${level7_3}`} />
                <PlayButton
                  name="level7_3"
                  onClick={this.onClick}
                  src={`${PlayImg}`}
                />
              </Box>
              <Text padding="20px">All 3 sentences translate to:</Text>
              <Text>My name is ______.</Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="230px"
          height960="230px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="180px">Pronouns </Th>
                <Th width="400px">Translation</Th>
                <Th width="80px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    내, 나의 <span style={{fontSize: '1rem'}}>(informal)</span>
                  </Td>
                  <Td>
                    my{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to friends, relatives, or chidlren)
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
                    제, 저희 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    my{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="level7_7" src={`${level7_7}`} />
                    <PlayButton
                      name="level7_7"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="160px"
          height960="160px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="180px">Nouns </Th>
                <Th width="400px">Translation</Th>
                <Th width="80px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>이름 </Td>
                  <Td>name </Td>
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
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="150px"
          height960="150px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="200px">Participle </Th>
                <Th width="200px">Translation</Th>
                <Th width="100px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>이/가 or 은/는</Td>
                  <Td>subject marker </Td>
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
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="470px"
          height960="470px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Subject Markers
              </Subtitle>
              <Text lineheight="3rem">
                Generally when you introduce a new subject in a conversation you
                will attach an 이/가 subject marker to the end of the word.
                After you start talking about the subject you attach the 은/는
                subject markers instead. However, normally when you are
                introducing yourself and stating your name, you will want to use
                the 은/는 markers. Choosing between which marker depends on the
                last letter of the subject. If it ends on a vowel you use 가 or
                는. If it ends on a consonant you use 이 or 은.{' '}
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="150px"
          height960="150px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="200px">Verb + Politeness </Th>
                <Th width="100px">Translation</Th>
                <Th width="100px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>이에요/예요</Td>
                  <Td>is </Td>
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
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="540px"
          height960="540px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#ff0000"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="1.5rem"
                fontweight="600">
                Rule: All sentences end in either a verb or adjective.
              </Subtitle>
              <Text lineheight="3rem">
                The verb 있다 transforms differently depending on the tense and
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
                When subjects end with a consonant like the name John, you will
                change 있 to 이에 then drop the 다 and replace it with 요, then
                attach it to the end of the subject to make one word,
                John이에요. When the subject ends in a vowel like the name Anna,
                you change 있 to 예 then drop the 다 and replace it with 요,
                then attach it to the end of the subject to make one word,
                Anna예요.
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="160px"
          height960="160px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Learning how to describe something with 있.
              </Subtitle>
              <Text>
                Now that you've learned how to say my(네/나의 or 제/저희) let's
                learn a few words to combine them with.
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="800px"
          height960="800px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="200px">Nouns </Th>
                <Th width="200px">Translation</Th>
                <Th width="150px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>개</Td>
                  <Td>dog</Td>
                  <Td>
                    <audio id="ge" src={`${ge}`} />
                    <PlayButton
                      name="ge"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>고양이</Td>
                  <Td>cat</Td>
                  <Td>
                    <audio id="goYangI" src={`${goYangI}`} />
                    <PlayButton
                      name="goYangI"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>컵</Td>
                  <Td>cup</Td>
                  <Td>
                    <audio id="kub" src={`${kub}`} />
                    <PlayButton
                      name="kub"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>상자</Td>
                  <Td>box</Td>
                  <Td>
                    <audio id="sangJa" src={`${sangJa}`} />
                    <PlayButton
                      name="sangJa"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>이름</Td>
                  <Td>name</Td>
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
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>드레스</Td>
                  <Td>dress</Td>
                  <Td>
                    <audio id="deuReSeu" src={`${deuReSeu}`} />
                    <PlayButton
                      name="deuReSeu"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                      verticalalign="middle"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>전화</Td>
                  <Td>telephone</Td>
                  <Td>
                    <audio id="jeonHoa" src={`${jeonHoa}`} />
                    <PlayButton
                      name="jeonHoa"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="560px"
          height960="560px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="200px">
                  Verbs{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="200px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="150px">
                  Pronunciation
                </Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>가다</Td>
                  <Td>to go</Td>
                  <Td>
                    <audio id="ga" src={`${ga}`} />
                    <PlayButton
                      name="ga"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>먹</Td>
                  <Td>to eat</Td>
                  <Td>
                    <audio id="meog" src={`${meog}`} />
                    <Img
                      display="inline"
                      name="meog"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>웃</Td>
                  <Td>to laugh</Td>
                  <Td>
                    <audio id="us" src={`${us}`} />
                    <Img
                      display="inline"
                      name="us"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>자</Td>
                  <Td>to sleep</Td>
                  <Td>
                    <audio id="ja" src={`${ja}`} />
                    <Img
                      display="inline"
                      name="ja"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>때리</Td>
                  <Td>to hit</Td>
                  <Td>
                    <audio id="ddaeRi" src={`${ddaeRi}`} />
                    <Img
                      display="inline"
                      name="ddaeRi"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="350px"
          height960="350px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Basic sentence structure
              </Subtitle>
              <Text lineheight="2.5rem">
                Let's examine this basic sentence example:
              </Text>
              <Text lineheight="2.5rem">going.</Text>
              <Text lineheight="2.5rem">남차가 달리다요.</Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="560px"
          height960="560px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="200px">
                  Subject{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="200px">
                  Subject Participle
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="150px">
                  Verb/Adjective
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="150px">
                  Form{' '}
                </Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    남차<span style={{fontSize: '1rem'}}>(the boy)</span>
                  </Td>
                  <Td>가</Td>
                  <Td>
                    달리다<span style={{fontSize: '1rem'}}>(soft)</span>
                  </Td>
                  <Td>요</Td>
                  {/* <audio id="test" src={`${test}`} />*/}
                  <Td>
                    <Img
                      display="inline"
                      name="test"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="350px"
          height960="350px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Subject participles
              </Subtitle>
              <Text lineheight="2.5rem">
                Every sentence must always end with a verb or adjective. To
                clarify a word as the subject of a sentence we use the particple
                이/가 and 은/는 participles. You use 이 with words that use a
                받침 and 가 with words that don't. When your subject is used as
                a contrast or counter-point, then you would use 은 with words
                that have 받침 and 는 that don't. Imagine these sentences as
                being prefaced with However or But.{' '}
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="560px"
          height960="560px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="200px">
                  Subject{' '}
                </Th>
                <Th borderbottom="1px solid black" width="150px">
                  Verb/Adjective
                </Th>
                <Th borderbottom="1px solid #333" width="150px">
                  Example
                </Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>The boy</Td>
                  <Td>
                    b <span style={{fontSize: '1rem'}}>(soft)</span>
                  </Td>
                  <Td>
                    <span>남자가 달리고</span>
                    {/* <audio id="test" src={`${test}`} />*/}
                    <Img
                      display="inline"
                      name="test"
                      onClick={this.onClick}
                      padding="0 0 0 20px"
                      cursor="pointer"
                      src={`${PlayImg}`}
                      verticalalign="middle"
                      width="30px"
                      height="40px"
                    />
                  </Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="160px"
          height960="160px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Yes or No{' '}
              </Subtitle>
              <Text>
                Play each word and try to mimic the pronunciation out loud.
              </Text>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="400px"
          height960="400px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th width="180px">Nouns </Th>
                <Th width="400px">Translation</Th>
                <Th width="80px">Pronunciation</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    네 <span style={{fontSize: '1rem'}}>(informal)</span>
                  </Td>
                  <Td>
                    yes{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to friends, relatives, or chidlren)
                    </span>
                  </Td>
                  <Td>
                    <audio id="ne" src={`${ne}`} />
                    <PlayButton
                      name="ne"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    예 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    yes{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="ye" src={`${ye}`} />
                    <PlayButton
                      name="ye"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    아니 <span style={{fontSize: '1rem'}}>(informal)</span>
                  </Td>
                  <Td>
                    no{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to friends, relatives, or chidlren)
                    </span>
                  </Td>
                  <Td>
                    <audio id="anI" src={`${anI}`} />
                    <PlayButton
                      name="anI"
                      onClick={this.onClick}
                      src={`${PlayImg}`}
                    />
                  </Td>
                </Tr>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    아니요 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    no{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="anIYo" src={`${anIYo}`} />
                    <PlayButton
                      name="anIYo"
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
