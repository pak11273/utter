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
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import source from '../../../src/data/korean/level6/vocab.js'
const babeul = cdn + source.examples.basic.밥을.korean.audioUrl
const buEok = cdn + source.examples.basic.부엌.korean.audioUrl
const sar = cdn + source.examples.basic.살.korean.audioUrl
const marHa = cdn + source.examples.basic.말하.korean.audioUrl
const chajDa = cdn + source.examples.basic.찾다.korean.audioUrl
const gang = cdn + source.examples.basic.강.korean.audioUrl
const jajA = cdn + source.examples.basic.잦아.korean.audioUrl
const osEun = cdn + source.examples.basic.옷은.korean.audioUrl
const gosI = cdn + source.examples.basic.곳이.korean.audioUrl
const naMusIb = cdn + source.examples.basic.나뭇입.korean.audioUrl
const nohEu = cdn + source.examples.basic.놓으.korean.audioUrl
const karI = cdn + source.examples.basic.칼이.korean.audioUrl
const agHa = cdn + source.examples.basic.악하.korean.audioUrl
const dadHida = cdn + source.examples.basic.닫히다.korean.audioUrl
const abHa = cdn + source.examples.basic.압하.korean.audioUrl
const yeorHag = cdn + source.examples.basic.열학.korean.audioUrl
const ahGa = cdn + source.examples.basic.앟가.korean.audioUrl
const ahJa = cdn + source.examples.basic.앟자.korean.audioUrl
const gudI = cdn + source.examples.basic.굳이.korean.audioUrl
const gatI = cdn + source.examples.basic.같이.korean.audioUrl
const manh = cdn + source.examples.basic.많.korean.audioUrl
const darg = cdn + source.examples.basic.닭.korean.audioUrl
const yeoDeorb = cdn + source.examples.basic.여덟.korean.audioUrl
const manhI = cdn + source.examples.basic.많이.korean.audioUrl
const eorgEo = cdn + source.examples.basic.얽어.korean.audioUrl
const eobsEo = cdn + source.examples.basic.없어.korean.audioUrl
const anjA = cdn + source.examples.basic.앉아.korean.audioUrl
const jjarbA = cdn + source.examples.basic.짧아.korean.audioUrl
const hartA = cdn + source.examples.basic.핥아.korean.audioUrl
const gurmEo = cdn + source.examples.basic.굶어.korean.audioUrl
const ggessEo = cdn + source.examples.basic.껬어.korean.audioUrl
const deudDa = cdn + source.examples.basic.듣다.korean.audioUrl
const jugEurRae = cdn + source.examples.basic.죽을래.korean.audioUrl
const aggMa = cdn + source.examples.basic.앆마.korean.audioUrl
const agNa = cdn + source.examples.basic.악나.korean.audioUrl
const abNa = cdn + source.examples.basic.압나.korean.audioUrl
const apNa = cdn + source.examples.basic.앞나.korean.audioUrl
const anMa = cdn + source.examples.basic.앗마.korean.audioUrl
const arNa = cdn + source.examples.basic.알나.korean.audioUrl
const daeHagRo = cdn + source.examples.basic.대학로.korean.audioUrl
const jongRo = cdn + source.examples.basic.종로.korean.audioUrl

class KoreanLevel6 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Wrapper>
        <Masthead
          background="#666"
          height="600px"
          height768="600px"
          justifycontent="center"
          padding="100px"
          textalign="left">
          <Box justifycontent="center" width960="1024px">
            <Title color="white" fontsize="3rem" padding="20px">
              Level Six - badchim 받침
            </Title>
            <Subtitle color="#bbb" fontsize="2rem" textalign="left">
              The last consonant(s) of a syllable is called a badchim. In this
              lesson you
              will
              learn the special conjugation rules that apply to badchim. Listen
              closely to the examples and try to mimic them as you play them.
            </Subtitle>
          </Box>
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
                One word, one consonant badchim
              </Subtitle>
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
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="150px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid #333" width="150px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㅂ,ㅍ
                  </Td>
                  <Td>b <span style={{fontSize: '1rem'}}>(soft)</span></Td>
                  <Td>
                    <span>밥을</span>
                    <audio id="babeul" src={`${babeul}`} />
                    <Img
                      display="inline"
                      name="babeul"
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
                    ㄱ,ㄲ,ㅋ
                  </Td>
                  <Td>g <span style={{fontSize: '1rem'}}>(soft)</span></Td>
                  <Td>
                    <span>부엌</span>
                    <audio id="buEok" src={`${buEok}`} />
                    <Img
                      display="inline"
                      name="buEok"
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
                    ㄹ
                  </Td>
                  <Td>l <span style={{fontSize: '1rem'}}>(soft)</span></Td>
                  <Td>
                    <span>살</span>
                    <audio id="sar" src={`${sar}`} />
                    <Img
                      display="inline"
                      name="sar"
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
                    ㄹ{' '}
                    <span style={{fontSize: '1rem'}}>(preceding a vowel)</span>
                  </Td>
                  <Td>r <span style={{fontSize: '1rem'}}>(soft)</span></Td>
                  <Td>
                    <span>말하</span>
                    <audio id="marHa" src={`${marHa}`} />
                    <Img
                      display="inline"
                      name="marHa"
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
                    ㄷ, ㅎ,ㅈ,ㅅ,ㅆ,ㅌ,ㅊ
                  </Td>
                  <Td>d <span style={{fontSize: '1rem'}}>(soft)</span></Td>
                  <Td>
                    <span>찾다</span>
                    <audio id="chajDa" src={`${chajDa}`} />
                    <Img
                      display="inline"
                      name="chajDa"
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
                    ㅇ
                  </Td>
                  <Td>ng</Td>
                  <Td>
                    <span>강</span>
                    <audio id="gang" src={`${gang}`} />
                    <Img
                      display="inline"
                      name="gang"
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
          alignitems="flex-end"
          flexdirection960="row"
          height="150px"
          height960="150px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Subtitle
            color="#333"
            margin="70px 0 0 0"
            fontsize="2rem"
            fontweight="600">
            One word, one consonant badchim followed by ㅇ
          </Subtitle>
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
                <Th borderbottom="1px solid black" padding="20px" width="50px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="150px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="300px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㅈ{' '}
                  </Td>
                  <Td>j</Td>
                  <Td>
                    <span>
                      잦아 <span style={{fontSize: '1rem'}}>sounds like</span> 자자{' '}
                    </span>
                    <audio id="jajA" src={`${jajA}`} />
                    <Img
                      display="inline"
                      name="jajA"
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
                    ㅅ
                  </Td>
                  <Td>
                    s <span style={{fontSize: '1rem'}}>(preceding 으)</span>
                  </Td>
                  <Td>
                    <span>
                      옷은 <span style={{fontSize: '1rem'}}>sounds like</span> 오슨{' '}
                    </span>
                    <audio id="osEun" src={`${osEun}`} />
                    <Img
                      display="inline"
                      name="osEun"
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
                    ㅅ
                  </Td>
                  <Td>
                    n <span style={{fontSize: '1rem'}}>or</span> sh{' '}
                    <span style={{fontSize: '1rem'}}>(preceding 이)</span>
                  </Td>
                  <Td>
                    <span>
                      곳이 <span style={{fontSize: '1rem'}}>sounds like</span> 고시{' '}
                    </span>
                    <audio id="gosI" src={`${gosI}`} />
                    <Img
                      display="inline"
                      name="gosI"
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
                    ㅅ
                  </Td>
                  <Td>
                    n <span style={{fontSize: '1rem'}}>or</span> sh{' '}
                    <span style={{fontSize: '1rem'}}>(preceding 이)</span>
                  </Td>
                  <Td>
                    <span>
                      나뭇입{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like
                      </span>{' '}
                      나무닙
                    </span>
                    <audio id="naMusIb" src={`${naMusIb}`} />
                    <Img
                      display="inline"
                      name="naMusIb"
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
                    ㅎ{' '}
                  </Td>
                  <Td>
                    ㅎ <span style={{fontSize: '1rem'}}>(is silent)</span>
                  </Td>
                  <Td>
                    <span>
                      놓으 <span style={{fontSize: '1rem'}}>sounds like</span> 노흐{' '}
                    </span>
                    <audio id="nohEu" src={`${nohEu}`} />
                    <Img
                      display="inline"
                      name="nohEu"
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
                    ㄹ
                  </Td>
                  <Td>
                    r
                  </Td>
                  <Td>
                    <span>
                      칼이 <span style={{fontSize: '1rem'}}>sounds like</span> 카리
                    </span>
                    <audio id="karI" src={`${karI}`} />
                    <Img
                      display="inline"
                      name="karI"
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
          alignitems="flex-end"
          flexdirection960="row"
          height="150px"
          height960="150px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column justifycontent="flex-start" color="#666" textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                fontsize="2rem"
                fontweight="600">
                One word, one consonant badchim followed by ㅎ{' '}
              </Subtitle>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="380px"
          height960="380px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="150px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="200px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="380px">Example</Th>
              </Thead>
              <tbody>
                <Tr>
                  <Td>
                    ㄱ, ㄷ, ㅂ{' '}
                  </Td>
                  <Td>
                    ㅎ{' '}
                    <span style={{fontSize: '1rem'}}>
                      is replaced by the badchim and is aspirated.
                    </span>
                  </Td>
                  <Td>
                    <span>
                      악하 <span style={{fontSize: '1rem'}}>sounds like</span> 아카
                    </span>
                    <audio id="agHa" src={`${agHa}`} />
                    <Img
                      display="inline"
                      name="agHa"
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
                <Tr>
                  <Td />
                  <Td />
                  <Td>
                    <span>
                      닫히다{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like
                      </span>{' '}
                      다티다{' '}
                    </span>
                    <audio id="dadHida" src={`${dadHida}`} />
                    <Img
                      display="inline"
                      name="dadHida"
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
                  <Td />
                  <Td />
                  <Td>
                    <span>
                      압하 <span style={{fontSize: '1rem'}}>sounds like</span> 아파
                    </span>
                    <audio id="abHa" src={`${abHa}`} />
                    <Img
                      display="inline"
                      name="abHa"
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
                <Tr>
                  <Td>
                    ㄹ
                  </Td>
                  <Td>
                    <span style={{fontSize: '1rem'}}>
                      aspirated
                    </span>{' '}
                    r{' '}
                    <span style={{fontSize: '1rem'}}>
                      almost a d sound.
                    </span>
                  </Td>
                  <Td>
                    <span>
                      열학 <span style={{fontSize: '1rem'}}>sounds like</span> 여닥
                    </span>
                    <audio id="yeorHag" src={`${yeorHag}`} />
                    <Img
                      display="inline"
                      name="yeorHag"
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
          alignitems="flex-end"
          flexdirection960="row"
          height="150px"
          height960="150px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column>
            <Column justifycontent="flex-start" color="#666" textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                fontsize="2rem"
                fontweight="600">
                ㅎ badchim followed by a consonant
              </Subtitle>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="430px"
          height960="430px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="90px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="150px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="400px">Example</Th>
              </Thead>
              <tbody>
                <Tr>
                  <Td>
                    ㅎ
                  </Td>
                  <Td>
                    ㅎ{' '}
                    <span style={{fontSize: '1rem'}}>
                      is silent and next consonant is aspirated.
                    </span>
                  </Td>
                  <Td>
                    <span>
                      앟가 <span style={{fontSize: '1rem'}}>sounds like</span> 아카
                    </span>
                    <audio id="ahGa" src={`${ahGa}`} />
                    <Img
                      display="inline"
                      name="ahGa"
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
                  <Td />
                  <Td />
                  <Td>
                    <span>
                      앟자 <span style={{fontSize: '1rem'}}>sounds like</span> 아차
                    </span>
                    <audio id="ahJa" src={`${ahJa}`} />
                    <Img
                      display="inline"
                      name="ahJa"
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
        <Section>
          >
          <Column>
            <Column
              justifycontent="flex-start"
              color="#666"
              fontsize="1.8rem"
              textalign="left">
              <Subtitle
                color="#333"
                margin="70px 0 0 0"
                fontsize="3rem"
                fontweight="600">
                Special Cases
              </Subtitle>
            </Column>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="250px"
          height960="250px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="150px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="180px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="300px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㄷ + 이{' '}
                  </Td>
                  <Td>
                    지{' '}
                  </Td>
                  <Td>
                    <span>
                      굳이 <span style={{fontSize: '1rem'}}>sounds like</span> 구지{' '}
                    </span>
                    <audio id="gudI" src={`${gudI}`} />
                    <Img
                      display="inline"
                      name="gudI"
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
                    ㅌ + 이{' '}
                  </Td>
                  <Td>
                    치{' '}
                  </Td>
                  <Td>
                    <span>
                      같이 <span style={{fontSize: '1rem'}}>sounds like</span> 가치
                    </span>
                    <audio id="gatI" src={`${gatI}`} />
                    <Img
                      display="inline"
                      name="gatI"
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
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Two consonant badchim{' '}
            </Subtitle>
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
                <Th borderbottom="1px solid black" padding="20px" width="100px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="150px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="250px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㄶ
                  </Td>
                  <Td>ㅎ <span style={{fontSize: '1rem'}}>(is silent)</span></Td>
                  <Td>
                    <span>
                      많 <span style={{fontSize: '1rem'}}>sounds like</span> 만
                    </span>
                    <audio id="manh" src={`${manh}`} />
                    <Img
                      display="inline"
                      name="manh"
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
                    ㄺ
                  </Td>
                  <Td>ㄹ <span style={{fontSize: '1rem'}}>(is silent)</span></Td>
                  <Td>
                    <span>
                      닭 <span style={{fontSize: '1rem'}}>sounds like</span> 닥
                    </span>
                    <audio id="darg" src={`${darg}`} />
                    <Img
                      display="inline"
                      name="darg"
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
                    ㄼ
                  </Td>
                  <Td>ㅂ <span style={{fontSize: '1rem'}}>(is silent)</span></Td>
                  <Td>
                    <span>
                      여덟 <span style={{fontSize: '1rem'}}>sounds like</span> 여덜
                    </span>
                    <audio id="yeoDeorb" src={`${yeoDeorb}`} />
                    <Img
                      display="inline"
                      name="yeoDeorb"
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
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Two consonant badchim followed by ㅇ
            </Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="640px"
          height960="640px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="100px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="235px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="250px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㄶ
                  </Td>
                  <Td>
                    ㅎ <span style={{fontSize: '1rem'}}>(is silent),</span> ㄴ{' '}
                    <span style={{fontSize: '1rem'}}>replaces</span> ㅇ
                  </Td>
                  <Td>
                    <span>
                      많이 <span style={{fontSize: '1rem'}}>sounds like</span> 마니
                    </span>
                    <audio id="manhI" src={`${manhI}`} />
                    <Img
                      display="inline"
                      name="manhI"
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
                    ㄺ
                  </Td>
                  <Td>ㄱ <span style={{fontSize: '1rem'}}>replaces</span> ㅇ</Td>
                  <Td>
                    <span>얽어</span>{' '}
                    <span style={{fontSize: '1rem'}}>sounds like </span>얼거
                    <audio id="eorgEo" src={`${eorgEo}`} />
                    <Img
                      display="inline"
                      name="eorgEo"
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
                    ㅄ{' '}
                  </Td>
                  <Td>ㅅ <span style={{fontSize: '1rem'}}>replaces</span>ㅇ</Td>
                  <Td>
                    없어 <span style={{fontSize: '1rem'}}>sounds like </span>
                    업서
                    <audio id="eobsEo" src={`${eobsEo}`} />
                    <Img
                      display="inline"
                      name="eobsEo"
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
                    ㄵ{' '}
                  </Td>
                  <Td>ㅈ <span style={{fontSize: '1rem'}}>replaces</span>ㅇ</Td>
                  <Td>
                    앉아 <span style={{fontSize: '1rem'}}>sounds like </span>
                    안자
                    <audio id="anjA" src={`${anjA}`} />
                    <Img
                      display="inline"
                      name="anjA"
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
                    ㄼ
                  </Td>
                  <Td>ㅂ <span style={{fontSize: '1rem'}}>replaces</span>ㅇ</Td>
                  <Td>
                    짧아 <span style={{fontSize: '1rem'}}>sounds like </span>
                    짤바
                    <audio id="jjarbA" src={`${jjarbA}`} />
                    <Img
                      display="inline"
                      name="jjarbA"
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
                    ㄾ{' '}
                  </Td>
                  <Td>ㅌ <span style={{fontSize: '1rem'}}>replaces</span>ㅇ</Td>
                  <Td>
                    핥아 <span style={{fontSize: '1rem'}}>sounds like </span>
                    할타
                    <audio id="hartA" src={`${hartA}`} />
                    <Img
                      display="inline"
                      name="hartA"
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
                    ㄻ{' '}
                  </Td>
                  <Td>ㅁ <span style={{fontSize: '1rem'}}>replaces</span>ㅇ</Td>
                  <Td>
                    굶어 <span style={{fontSize: '1rem'}}>sounds like </span>
                    굴머
                    <audio id="gurmEo" src={`${gurmEo}`} />
                    <Img
                      display="inline"
                      name="gurmEo"
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
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Double consonant badchim
            </Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="170px"
          height960="170px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="100px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="235px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="250px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㅆ{' '}
                  </Td>
                  <Td>
                    ㅆ <span style={{fontSize: '1rem'}}>replaces</span> ㅇ
                  </Td>
                  <Td>
                    <span>
                      껬어 <span style={{fontSize: '1rem'}}>sounds like</span> 께써
                    </span>
                    <audio id="ggessEo" src={`${ggessEo}`} />
                    <Img
                      display="inline"
                      name="ggessEo"
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
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Double consonant liaison{' '}
            </Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="170px"
          height960="170px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="100px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="310px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="300px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㄷ
                  </Td>
                  <Td>
                    ㄷ <span style={{fontSize: '1rem'}}>replaces</span> ㄷ{' '}
                    <span style={{fontSize: '1rem'}}>with</span> ㄸ
                  </Td>
                  <Td>
                    <span>
                      듣다 <span style={{fontSize: '1rem'}}>sounds like</span> 드따{' '}
                    </span>
                    <audio id="deudDa" src={`${deudDa}`} />
                    <Img
                      display="inline"
                      name="deudDa"
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
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Special Case
            </Subtitle>
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
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th borderbottom="1px solid black" padding="20px" width="100px">
                  Badchim
                </Th>
                <Th borderbottom="1px solid black" width="180px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="330px">Example</Th>
              </Thead>
              <tbody>
                <Tr borderbottom="1px solid #333" height="80px">
                  <Td>
                    ㄹ{' '}
                  </Td>
                  <Td>
                    ㄹ <span style={{fontSize: '1rem'}}>(a hard 'L' sound)</span>
                  </Td>
                  <Td>
                    <span>
                      죽을래{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like
                      </span>{' '}
                      주그래
                    </span>
                    <audio id="jugEurRae" src={`${jugEurRae}`} />
                    <Img
                      display="inline"
                      name="jugEurRae"
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
          height="275px"
          height960="200px"
          maxwidth="960px"
          padding="30px"
          textalign="left">
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.4rem"
            textalign="left">
            <Subtitle color="#333" padding="0 5% 0 5%" fontsize="2rem">
              Note: All double consonant liaisons will have this same format.
            </Subtitle>
          </Column>
        </Section>
        <Section>
          <Column
            justifycontent="flex-start"
            color="#666"
            fontsize="1.8rem"
            textalign="left">
            <Subtitle
              color="#333"
              margin="70px 0 0 0"
              padding="6.5% 5% 0 5%"
              fontsize="3rem"
              fontweight="600">
              Badchim transformations
            </Subtitle>
          </Column>
        </Section>
        <Section
          alignitems="flex-start"
          flexdirection960="row"
          height="960px"
          height960="1260px"
          maxwidth="1260px"
          padding="30px"
          textalign="left">
          <Box color="black" overflowx="auto">
            <Table tablelayout="fixed" vertival-align="middle" width="100%">
              <Thead>
                <Th
                  borderbottom="1px solid black"
                  padding="20px"
                  align="center"
                  width="170px">
                  Badchim + consonant
                </Th>
                <Th borderbottom="1px solid black" width="200px">
                  Pronunciation
                </Th>
                <Th borderbottom="1px solid black" width="340px">Example</Th>
              </Thead>
              <tbody>
                <Tr height="80px">
                  <Td>
                    ㄱ, ㄲ, ㅋ + ㄴ <span style={{fontSize: '1rem'}}>or</span> ㅁ
                  </Td>
                  <Td>
                    ㄱ, ㄲ, ㅋ{' '}
                    <span style={{fontSize: '1rem'}}>(transforms to)</span> ㅇ
                  </Td>
                  <Td>
                    <span>
                      앆마{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 앙마
                    </span>
                    <audio id="aggMa" src={`${aggMa}`} />
                    <Img
                      display="inline"
                      name="aggMa"
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
                  <Td />
                  <Td />
                  <Td>
                    <span>
                      악나{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like
                      </span>{' '}
                      앙나
                    </span>
                    <audio id="agNa" src={`${agNa}`} />
                    <Img
                      display="inline"
                      name="agNa"
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
                <Tr height="80px">
                  <Td>
                    ㅂ, ㅍ + ㄴ <span style={{fontSize: '1rem'}}>or</span> ㅁ
                  </Td>
                  <Td>
                    ㅂ, ㅍ
                    <span style={{fontSize: '1rem'}}>
                      (transforms to)
                    </span>{' '}
                    ㅁ{' '}
                  </Td>
                  <Td>
                    <span>
                      압나{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 암나
                    </span>
                    <audio id="abNa" src={`${abNa}`} />
                    <Img
                      display="inline"
                      name="abNa"
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
                  <Td />
                  <Td />
                  <Td>
                    <span>
                      앞나{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like
                      </span>{' '}
                      암나
                    </span>
                    <audio id="apNa" src={`${apNa}`} />
                    <Img
                      display="inline"
                      name="apNa"
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
                    ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ + ㄴ{' '}
                    <span style={{fontSize: '1rem'}}>or</span>{' '}
                    ㅁ
                  </Td>
                  <Td>
                    ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ{' '}
                    <span style={{fontSize: '1rem'}}>
                      (transforms to)
                    </span>{' '}
                    ㄴ{' '}
                  </Td>
                  <Td>
                    <span>
                      앗마{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 안마{' '}
                    </span>
                    <audio id="anMa" src={`${anMa}`} />
                    <Img
                      display="inline"
                      name="anMa"
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
                    ㄹ + ㄴ
                    <span style={{fontSize: '1rem'}}>
                      or
                    </span>
                    ㄴ + ㄹ
                  </Td>
                  <Td>
                    <span style={{fontSize: '1rem'}}>
                      transforms to
                    </span>{' '}
                    ㄹㄹ{' '}
                    <span style={{fontSize: '1rem'}}>(a hard 'L' sound)</span>
                  </Td>
                  <Td>
                    <span>
                      알나{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 알라{' '}
                    </span>
                    <audio id="arNa" src={`${arNa}`} />
                    <Img
                      display="inline"
                      name="arNa"
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
                    ㄱ + ㄹ{' '}
                  </Td>
                  <Td>
                    ㄱ{' '}
                    <span style={{fontSize: '1rem'}}>
                      transforms to
                    </span>{' '}
                    ㅇ{' '},
                    ㄹ{' '}
                    <span style={{fontSize: '1rem'}}>
                      transforms to
                    </span>{' '}
                    ㄴ{' '}
                  </Td>
                  <Td>
                    <span>
                      대학로{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 대항노{' '}
                    </span>
                    <audio id="daeHagRo" src={`${daeHagRo}`} />
                    <Img
                      display="inline"
                      name="daeHagRo"
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
                    ㅇ + ㄹ{' '}
                  </Td>
                  <Td>
                    ㄹ{' '}
                    <span style={{fontSize: '1rem'}}>
                      transforms to
                    </span>{' '}
                    ㄴ{' '}
                  </Td>
                  <Td>
                    <span>
                      종로{' '}
                      <span style={{fontSize: '1rem'}}>
                        sounds like{' '}
                      </span>{' '} 종노{' '}
                    </span>
                    <audio id="jongRo" src={`${jongRo}`} />
                    <Img
                      display="inline"
                      name="jongRo"
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

export default KoreanLevel6
