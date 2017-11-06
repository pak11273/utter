import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {
  Audio,
  Box,
  Column,
  Grid,
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
  Section
} from '../../components'

import {Masthead} from '../../containers'
import PlayImg from '../../assets/images/play.svg'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

import vocab from '../../../src/data/spanish/level1/vocab.js'
import sharedPhrases from '../../../src/data/shared/level1/phrases.js'

//alphabet - consonants
const b = cdn + vocab.category.alphabet.consonants.b.spanish.audioUrl
const c = cdn + vocab.category.alphabet.consonants.c.spanish.audioUrl
const d = cdn + vocab.category.alphabet.consonants.d.spanish.audioUrl
const f = cdn + vocab.category.alphabet.consonants.f.spanish.audioUrl
const g = cdn + vocab.category.alphabet.consonants.g.spanish.audioUrl
const h = cdn + vocab.category.alphabet.consonants.h.spanish.audioUrl
const ch = cdn + vocab.category.alphabet.consonants.ch.spanish.audioUrl
const j = cdn + vocab.category.alphabet.consonants.j.spanish.audioUrl
const k = cdn + vocab.category.alphabet.consonants.k.spanish.audioUrl
const l = cdn + vocab.category.alphabet.consonants.l.spanish.audioUrl
const ll = cdn + vocab.category.alphabet.consonants.ll.spanish.audioUrl
const m = cdn + vocab.category.alphabet.consonants.m.spanish.audioUrl
const n = cdn + vocab.category.alphabet.consonants.n.spanish.audioUrl
const ñ = cdn + vocab.category.alphabet.consonants.ñ.spanish.audioUrl
const p = cdn + vocab.category.alphabet.consonants.p.spanish.audioUrl
const q = cdn + vocab.category.alphabet.consonants.q.spanish.audioUrl
const r = cdn + vocab.category.alphabet.consonants.r.spanish.audioUrl
const rr = cdn + vocab.category.alphabet.consonants.rr.spanish.audioUrl
const s = cdn + vocab.category.alphabet.consonants.s.spanish.audioUrl
const t = cdn + vocab.category.alphabet.consonants.t.spanish.audioUrl
const v = cdn + vocab.category.alphabet.consonants.v.spanish.audioUrl
const w = cdn + vocab.category.alphabet.consonants.w.spanish.audioUrl
const x = cdn + vocab.category.alphabet.consonants.x.spanish.audioUrl
const y = cdn + vocab.category.alphabet.consonants.y.spanish.audioUrl
const z = cdn + vocab.category.alphabet.consonants.z.spanish.audioUrl

// vowels
const a = cdn + vocab.category.alphabet.vowels.a.spanish.audioUrl
const e = cdn + vocab.category.alphabet.vowels.e.spanish.audioUrl
const i = cdn + vocab.category.alphabet.vowels.i.spanish.audioUrl
const o = cdn + vocab.category.alphabet.vowels.o.spanish.audioUrl
const u = cdn + vocab.category.alphabet.vowels.u.spanish.audioUrl

// phrases
const hello = cdn + sharedPhrases.greetings.hello.spanish.audioUrl
const bye = cdn + sharedPhrases.greetings.bye.spanish.audioUrl

class SpanishLevel1 extends Component {
  onClick(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }
  render() {
    return (
      <Grid>
        <Masthead background="gray" height="500px">
          <Column>
            <Box>
              <MastheadTitle>
                Level One - Spanish{' '}
              </MastheadTitle>
              <MastheadSubtitle>
                Learn the Spanish alphabet
              </MastheadSubtitle>
            </Box>
          </Column>
        </Masthead>
        <Section maxwidth="960px">
          <Column>
            <Box padding="40px">
              <Subtitle>
                Alphabet{' '}
              </Subtitle>
              <Text>
                Spanish consists of 24 consonants and 5 vowels. We have
                included
                some other common letters that you need to learn for future
                lessons.
              </Text>
            </Box>
          </Column>
        </Section>
        <Grid gridautorows="300px">
          <Grid gridtemplatecolumns="1fr 4fr 1fr" gridautorows="100px">
            <Box background="black" color="white">
              Consonants{' '}
            </Box>
            <Box background="black" color="white">
              Pronuciation{' '}
            </Box>
            <Box background="black" color="white">
              Play
            </Box>
            <Box>
              <p>b</p>
            </Box>
            <Box>
              <p>b as in <span style={{color: 'red'}}>b</span>ed</p>
            </Box>
            <Box>
              <audio id="b" src={`${b}`} />
              <PlayButton
                margin="0"
                name="b"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Grid>
          <Box background="blue">
            <p>hello</p>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default SpanishLevel1

/*
                <tbody>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      c
                    </Td>
                    <Td>
                      c as in <span style={{color: 'red'}}>c</span>esar and c as
                      in c<span style={{color: 'red'}}>at</span>
                    </Td>
                    <Td>
                      <audio id="c" src={`${c}`} />
                      <PlayButton
                        margin="0"
                        name="c"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      d
                    </Td>
                    <Td>
                      d as in <span style={{color: 'red'}}>d</span>ear
                    </Td>
                    <Td>
                      <audio id="d" src={`${d}`} />
                      <PlayButton
                        margin="0"
                        name="d"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      f
                    </Td>
                    <Td>
                      f as in <span style={{color: 'red'}}>f</span>ine
                    </Td>
                    <Td>
                      <audio id="f" src={`${f}`} />
                      <PlayButton
                        margin="0"
                        name="f"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      g
                    </Td>
                    <Td>
                      g as in <span style={{color: 'red'}}>g</span>ator or h as
                      in <span style={{color: 'red'}}>h</span>air
                    </Td>
                    <Td>
                      <audio id="g" src={`${g}`} />
                      <PlayButton
                        margin="0"
                        name="g"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      h
                    </Td>
                    <Td>
                      You do not pronounce this letter
                    </Td>
                    <Td>
                      <audio id="h" src={`${h}`} />
                      <PlayButton
                        margin="0"
                        name="h"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      ch
                    </Td>
                    <Td>
                      ch as in <span style={{color: 'red'}}>ch</span>air{' '}
                    </Td>
                    <Td>
                      <audio id="ch" src={`${ch}`} />
                      <PlayButton
                        margin="0"
                        name="ch"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      j
                    </Td>
                    <Td>
                      h as in <span style={{color: 'red'}}>h</span>air{' '}
                    </Td>
                    <Td>
                      <audio id="j" src={`${j}`} />
                      <PlayButton
                        margin="0"
                        name="j"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      k
                    </Td>
                    <Td>
                      k as in <span style={{color: 'red'}}>k</span>ite{' '}
                    </Td>
                    <Td>
                      <audio id="k" src={`${k}`} />
                      <PlayButton
                        margin="0"
                        name="k"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      l
                    </Td>
                    <Td>
                      l as in <span style={{color: 'red'}}>l</span>ady{' '}
                    </Td>
                    <Td>
                      <audio id="l" src={`${l}`} />
                      <PlayButton
                        margin="0"
                        name="l"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      ll
                    </Td>
                    <Td>
                      y as in <span style={{color: 'red'}}>y</span>es{' '}
                    </Td>
                    <Td>
                      <audio id="ll" src={`${ll}`} />
                      <PlayButton
                        margin="0"
                        name="ll"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      m
                    </Td>
                    <Td>
                      m as in <span style={{color: 'red'}}>m</span>an{' '}
                    </Td>
                    <Td>
                      <audio id="m" src={`${m}`} />
                      <PlayButton
                        margin="0"
                        name="m"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      n
                    </Td>
                    <Td>
                      n as in <span style={{color: 'red'}}>n</span>an{' '}
                    </Td>
                    <Td>
                      <audio id="n" src={`${n}`} />
                      <PlayButton
                        margin="0"
                        name="n"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      ñ
                    </Td>
                    <Td>
                      ny as in bu<span style={{color: 'red'}}>ny</span>un{' '}
                    </Td>
                    <Td>
                      <audio id="ñ" src={`${ñ}`} />
                      <PlayButton
                        margin="0"
                        name="ñ"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      p
                    </Td>
                    <Td>
                      p as in <span style={{color: 'red'}}>p</span>ower{' '}
                    </Td>
                    <Td>
                      <audio id="p" src={`${p}`} />
                      <PlayButton
                        margin="0"
                        name="p"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      q
                    </Td>
                    <Td>
                      k as in <span style={{color: 'red'}}>k</span>id{' '}
                    </Td>
                    <Td>
                      <audio id="q" src={`${q}`} />
                      <PlayButton
                        margin="0"
                        name="q"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      r
                    </Td>
                    <Td>
                      r as in <span style={{color: 'red'}}>r</span>ed{' '}
                    </Td>
                    <Td>
                      <audio id="r" src={`${r}`} />
                      <PlayButton
                        margin="0"
                        name="r"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      rr{' '}
                    </Td>
                    <Td>
                      rr as in pe<span style={{color: 'red'}}>rr</span>o{' '}
                    </Td>
                    <Td>
                      <audio id="rr" src={`${rr}`} />
                      <PlayButton
                        margin="0"
                        name="rr"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      s
                    </Td>
                    <Td>
                      s as in <span style={{color: 'red'}}>s</span>ed{' '}
                    </Td>
                    <Td>
                      <audio id="s" src={`${s}`} />
                      <PlayButton
                        margin="0"
                        name="s"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      t
                    </Td>
                    <Td>
                      t as in <span style={{color: 'red'}}>t</span>alk{' '}
                    </Td>
                    <Td>
                      <audio id="t" src={`${t}`} />
                      <PlayButton
                        margin="0"
                        name="t"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      v
                    </Td>
                    <Td>
                      b as in bed
                    </Td>
                    <Td>
                      <audio id="v" src={`${v}`} />
                      <PlayButton
                        margin="0"
                        name="v"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      w
                    </Td>
                    <Td>
                      w as in wed
                    </Td>
                    <Td>
                      <audio id="w" src={`${w}`} />
                      <PlayButton
                        margin="0"
                        name="w"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      x
                    </Td>
                    <Td>
                      x as in xed
                    </Td>
                    <Td>
                      <audio id="x" src={`${x}`} />
                      <PlayButton
                        margin="0"
                        name="x"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      y
                    </Td>
                    <Td>
                      y as in yed
                    </Td>
                    <Td>
                      <audio id="y" src={`${y}`} />
                      <PlayButton
                        margin="0"
                        name="y"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      z
                    </Td>
                    <Td>
                      z as in zed
                    </Td>
                    <Td>
                      <audio id="z" src={`${z}`} />
                      <PlayButton
                        margin="0"
                        name="z"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                </tbody>
              </Table>
            </Box>

            <Box color="black" margin="80px 0 0 0" overflowx="auto">
              <Table verticalalign="middle">
                <Thead>
                  <Th width="18%">
                    Vowels{' '}
                  </Th>
                  <Th width="28%">
                    Pronuciation{' '}
                  </Th>
                  <Th width="10%">
                    Play
                  </Th>
                </Thead>
                <tbody>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      a
                    </Td>
                    <Td>
                      a as in b<span style={{color: 'red'}}>a</span>nana
                    </Td>
                    <Td>
                      <audio id="a" src={`${a}`} />
                      <PlayButton
                        margin="0"
                        name="a"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      e
                    </Td>
                    <Td>
                      e as in b<span style={{color: 'red'}}>e</span>d
                    </Td>
                    <Td>
                      <audio id="e" src={`${e}`} />
                      <PlayButton
                        margin="0"
                        name="e"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      i
                    </Td>
                    <Td>
                      e as in f<span style={{color: 'red'}}>e</span>ed
                    </Td>
                    <Td>
                      <audio id="i" src={`${i}`} />
                      <PlayButton
                        margin="0"
                        name="i"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      o
                    </Td>
                    <Td>
                      o as in <span style={{color: 'red'}}>o</span>ver
                    </Td>
                    <Td>
                      <audio id="o" src={`${o}`} />
                      <PlayButton
                        margin="0"
                        name="o"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      u
                    </Td>
                    <Td>
                      u as in l<span style={{color: 'red'}}>u</span>be
                    </Td>
                    <Td>
                      <audio id="u" src={`${u}`} />
                      <PlayButton
                        margin="0"
                        name="u"
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
            <Box padding="40px">
              <Subtitle>
                Greetings{' '}
              </Subtitle>
              <Text lineheight="3rem">
                Let's learn some common greetings in Spanish.
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
                      hola
                    </Td>
                    <Td>
                      Hello{' '}
                    </Td>
                    <Td>
                      <audio id="hello" src={`${hello}`} />
                      <PlayButton
                        margin="0"
                        name="hello"
                        onClick={this.onClick}
                        padding="0"
                        src={`${PlayImg}`}
                      />
                    </Td>
                  </Tr>
                  <Tr borderbottom="1px solid #333" height="80px">
                    <Td>
                      adiós{' '}
                    </Td>
                    <Td>
                      Bye{' '}
                    </Td>
                    <Td>
                      <audio id="bye" src={`${bye}`} />
                      <PlayButton
                        margin="0"
                        name="bye"
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
*/
