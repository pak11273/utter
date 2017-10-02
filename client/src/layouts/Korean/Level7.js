import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

import {
  Audio,
  Box,
  Column,
  Img,
  Masthead,
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
import Navbar from '../../containers/Navbars/Navbar'

import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import source from '../../../src/data/level7/vocab.js'
const anI = cdn + source.category.nouns.misc.no.해체.audioUrl
const anIYo = cdn + source.category.nouns.misc.no.korean.audioUrl
const ye = cdn + source.category.nouns.misc.yes.korean.audioUrl
const ne = cdn + source.category.nouns.misc.yes.해체.audioUrl
const je = cdn + source.category.nouns.speech.pronouns.my.korean.audioUrl
const neORnaE = cdn + source.category.nouns.speech.pronouns.my.해체.audioUrl

const eun = cdn + source.category.nouns.speech.participles.은.korean.audioUrl
const neun = cdn + source.category.nouns.speech.participles.는.korean.audioUrl
const i = cdn + source.category.nouns.speech.participles.이.korean.audioUrl
const ga = cdn + source.category.nouns.speech.participles.가.korean.audioUrl
const jeo = cdn + source.category.nouns.speech.pronouns.I.korean.audioUrl
const na = cdn + source.category.nouns.speech.pronouns.I.해체.audioUrl
const eunHaeng = cdn + source.category.nouns.buildings.bank.korean.audioUrl
const beoSeu = cdn + source.category.nouns.vehicles.bus.korean.audioUrl
const sangJa = cdn + source.category.nouns.misc.box.korean.audioUrl
const kub = cdn + source.category.nouns.kitchen.cup.korean.audioUrl
const siGye = cdn + source.category.nouns.bedroom.clock.korean.audioUrl
const jeonHoa = cdn + source.category.nouns.bedroom.telephone.korean.audioUrl
const tiBi = cdn + source.category.nouns.bedroom.television.korean.audioUrl
const deuReSeu = cdn + source.category.nouns.clothes.dress.korean.audioUrl
const iReum = cdn + source.category.nouns.misc.name.korean.audioUrl
const meogDa = cdn + source.category.verbs.eat.korean.audioUrl
const gaDa = cdn + source.category.verbs.go.korean.audioUrl
const ddaeRiDa = cdn + source.category.verbs.hit.korean.audioUrl
const usDa = cdn + source.category.verbs.laugh.korean.audioUrl
const jaDa = cdn + source.category.verbs.sleep.korean.audioUrl

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
              Level Eight - Basic Grammar
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
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="180px">
                  Nouns{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="400px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="80px">
                  Pronunciation
                </Th>
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
                    <Img
                      display="inline"
                      name="ne"
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
                  <Td>
                    에 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    yes{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="ye" src={`${ye}`} />
                    <Img
                      display="inline"
                      name="ye"
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
                    <Img
                      display="inline"
                      name="anI"
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
                    <Img
                      display="inline"
                      name="anIYo"
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
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="2rem"
                fontweight="600">
                Building Simple Sentences
              </Subtitle>
              <Subtitle
                color="#ff0000"
                margin="70px 0 0 0"
                padding="1rem"
                fontsize="1.5rem"
                fontweight="600">
                Rule: All sentences end in either a verb or adjective.
              </Subtitle>
              <Text>
                We are going to deconstruct the following sentences:
              </Text>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">
                  제 이름은 Mary예요.
                </Text>
                <audio id="neORnaE" src={`${neORnaE}`} />
                <Img
                  display="inline"
                  name="neORnaE"
                  onClick={this.onClick}
                  padding="0 0 0 20px"
                  cursor="pointer"
                  src={`${PlayImg}`}
                  verticalalign="middle"
                  width="30px"
                  height="40px"
                />
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">
                  내 이름은 John이에요.
                </Text>
                <audio id="neORnaE" src={`${neORnaE}`} />
                <Img
                  display="inline"
                  name="neORnaE"
                  onClick={this.onClick}
                  padding="0 0 0 20px"
                  cursor="pointer"
                  src={`${PlayImg}`}
                  verticalalign="middle"
                  width="30px"
                  height="40px"
                />
              </Box>
              <Box color="black" flexdirection="row" justifycontent="center">
                <Text padding="20px">
                  나의 이름은 Anna예요.
                </Text>
                <audio id="neORnaE" src={`${neORnaE}`} />
                <Img
                  display="inline"
                  name="neORnaE"
                  onClick={this.onClick}
                  padding="0 0 0 20px"
                  cursor="pointer"
                  src={`${PlayImg}`}
                  verticalalign="middle"
                  width="30px"
                  height="40px"
                />
              </Box>
              <Text padding="20px">
                All 3 sentences translate to:
              </Text>
              <Text>
                My name is ______.
              </Text>
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
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="180px">
                  Pronouns{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="400px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="80px">
                  Pronunciation
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
                      (when speaking to friends, relatives, or chidlren)
                    </span>
                  </Td>
                  <Td>
                    <audio id="neORnaE" src={`${neORnaE}`} />
                    <Img
                      display="inline"
                      name="neORnaE"
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
                  <Td>
                    체 <span style={{fontSize: '1rem'}}>(formal)</span>
                  </Td>
                  <Td>
                    my{' '}
                    <span style={{fontSize: '1rem'}}>
                      (when speaking to elders, superiors, or strangers)
                    </span>
                  </Td>
                  <Td>
                    <audio id="je" src={`${je}`} />
                    <Img
                      display="inline"
                      name="je"
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
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="180px">
                  Nouns{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="400px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="80px">
                  Pronunciation
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
                    <audio id="jeo" src={`${jeo}`} />
                    <Img
                      display="inline"
                      name="jeo"
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
          height="300px"
          height960="300px"
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
                  Participle{' '}
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
                  width="100px">
                  Pronunciation
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
                    <audio id="jeo" src={`${jeo}`} />
                    <Img
                      display="inline"
                      name="jeo"
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
          height="300px"
          height960="300px"
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
                  width="100px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="100px">
                  Pronunciation
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
                    <audio id="jeo" src={`${jeo}`} />
                    <Img
                      display="inline"
                      name="jeo"
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
          height="800px"
          height960="800px"
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
                  Nouns{' '}
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
                  <Td>은행</Td>
                  <Td>bank</Td>
                  <Td>
                    <audio id="eunHaeng" src={`${eunHaeng}`} />
                    <Img
                      display="inline"
                      name="eunHaeng"
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
                  <Td>버스</Td>
                  <Td>bus</Td>
                  <Td>
                    <audio id="beoSeu" src={`${beoSeu}`} />
                    <Img
                      display="inline"
                      name="beoSeu"
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
                  <Td>컵</Td>
                  <Td>cup</Td>
                  <Td>
                    <audio id="kub" src={`${kub}`} />
                    <Img
                      display="inline"
                      name="kub"
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
                  <Td>상자</Td>
                  <Td>box</Td>
                  <Td>
                    <audio id="sangJa" src={`${sangJa}`} />
                    <Img
                      display="inline"
                      name="sangJa"
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
                  <Td>이름</Td>
                  <Td>name</Td>
                  <Td>
                    <audio id="iReum" src={`${iReum}`} />
                    <Img
                      display="inline"
                      name="iReum"
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
                  <Td>시계</Td>
                  <Td>clock</Td>
                  <Td>
                    <audio id="siGye" src={`${siGye}`} />
                    <Img
                      display="inline"
                      name="siGye"
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
                  <Td>드레스</Td>
                  <Td>dress</Td>
                  <Td>
                    <audio id="deuReSeu" src={`${deuReSeu}`} />
                    <Img
                      display="inline"
                      name="deuReSeu"
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
                  <Td>전화</Td>
                  <Td>telephone</Td>
                  <Td>
                    <audio id="jeonHoa" src={`${jeonHoa}`} />
                    <Img
                      display="inline"
                      name="jeonHoa"
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
                  <Td>티비</Td>
                  <Td>television</Td>
                  <Td>
                    <audio id="tiBi" src={`${tiBi}`} />
                    <Img
                      display="inline"
                      name="tiBi"
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
                    <audio id="gaDa" src={`${gaDa}`} />
                    <Img
                      display="inline"
                      name="gaDa"
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
                  <Td>먹다</Td>
                  <Td>to eat</Td>
                  <Td>
                    <audio id="meogDa" src={`${meogDa}`} />
                    <Img
                      display="inline"
                      name="meogDa"
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
                  <Td>웃다</Td>
                  <Td>to laugh</Td>
                  <Td>
                    <audio id="usDa" src={`${usDa}`} />
                    <Img
                      display="inline"
                      name="usDa"
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
                  <Td>자다</Td>
                  <Td>to sleep</Td>
                  <Td>
                    <audio id="jaDa" src={`${jaDa}`} />
                    <Img
                      display="inline"
                      name="jaDa"
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
                  <Td>때리다</Td>
                  <Td>to hit</Td>
                  <Td>
                    <audio id="ddaeRiDa" src={`${ddaeRiDa}`} />
                    <Img
                      display="inline"
                      name="ddaeRiDa"
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
          height="400px"
          height960="400px"
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
                  width="180px">
                  Participles{' '}
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  padding="20px"
                  width="400px">
                  Translation
                </Th>
                <Th
                  borderbottom="1px solid black"
                  fontsize="1rem"
                  fontweight="bold"
                  width="80px">
                  Pronunciation
                </Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    가{' '}
                  </Td>
                  <Td>
                    <span style={{fontSize: '1rem'}}>
                      After a subject has been introduced use this particple to
                      make the subject of your sentence distinct.
                    </span>
                  </Td>
                  <Td>
                    <audio id="ga" src={`${ga}`} />
                    <Img
                      display="inline"
                      name="ga"
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
                  <Td>
                    은
                  </Td>
                  <Td>
                    <span style={{fontSize: '1rem'}}>
                      Use this particlple to mark a subject when introducing a
                      subject. Only for subjects ending with a consonant.
                    </span>
                  </Td>
                  <Td>
                    <audio id="eun" src={`${eun}`} />
                    <Img
                      display="inline"
                      name="eun"
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
              <Text lineheight="2.5rem">
                going.
              </Text>
              <Text lineheight="2.5rem">
                남차가 달리다요.
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
                  <Td>
                    가
                  </Td>
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
                Every sentence must always end with a verb or adjective.
                To clarify a word as the subject of a sentence we use the
                particple 이/가 and 은/는 participles. You use 이 with words that use
                a 받침 and 가 with words that don't. When your subject is used as a
                contrast or counter-point, then you would use 은 with words that
                have 받침 and 는 that don't. Imagine these sentences as being
                prefaced with However or But.{' '}
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
                <Th borderbottom="1px solid #333" width="150px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    The boy
                  </Td>
                  <Td>b <span style={{fontSize: '1rem'}}>(soft)</span></Td>
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
      </Wrapper>
    )
  }
}

export default KoreanLevel7
