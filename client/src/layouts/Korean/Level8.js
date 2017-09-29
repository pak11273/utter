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

import source from '../../../src/data/level6/vocab.js'
const babeul = cdn + source.examples.basic.밥을.korean.audioUrl

class KoreanLevel8 extends Component {
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
          <Title color="white" fontsize="2rem">
            Level Eight - Basic Grammar
          </Title>
          <Subtitle color="#bbb" fontsize="1.5rem">
            In this lesson you will learn simple grammar to form simple
            sentences.
          </Subtitle>
        </Masthead>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="150px"
          height960="150px"
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
                padding="6.5% 5% 0 5%"
                fontsize="2rem"
                fontweight="600">
                Basic sentence structure
              </Subtitle>
              <Text>
                Every sentence must always end with a verb or adjective
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
                    <audio id="namJaGa_darRiGo" src={`${namJaGa_darRiGo}`} />
                    <Img
                      display="inline"
                      name="namJaGa_darRiGo"
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

export default KoreanLevel8
