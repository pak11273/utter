import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import styled, {ThemeProvider} from "styled-components"
import {NavLink} from "react-router-dom"
import {
  Audio,
  Box,
  Column,
  Dictionary,
  Grid,
  Img,
  PlayBox,
  PlayButton,
  RememberSection,
  Spacer,
  Subtitle,
  Text,
  Section,
  Wrapper
} from "../../../components"

import {Masthead, Info} from "../components"
import PlayImg from "../../../assets/images/play.svg"

// fetch level 1 vocabulary and store in redux
/* import actionCreators from '../../Admin/Vocabulary/actions.js' */
/* import fetchWords from '../../Admin/Vocabulary/actions.js' */

// cdn
import cdnUrl from "../../../../src/config/secrets.js"
const cdn = cdnUrl.cdn

import vocab from "../../../../src/data/spanish/level1/vocab.js"
import sharedPhrases from "../../../../src/data/shared/phrases.js"

// vowels
const a = cdn + vocab.category.alphabet.vowels.a.spanish.audioUrl
const e = cdn + vocab.category.alphabet.vowels.e.spanish.audioUrl
const i = cdn + vocab.category.alphabet.vowels.i.spanish.audioUrl
const o = cdn + vocab.category.alphabet.vowels.o.spanish.audioUrl
const u = cdn + vocab.category.alphabet.vowels.u.spanish.audioUrl

// phrases
const hello = cdn + sharedPhrases.greetings.hello.spanish.informal.audioUrl
const bye = cdn + sharedPhrases.greetings.bye.spanish.informal.audioUrl

class SpanishLevel1 extends Component {
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
  }

  render() {
    return (
      <Wrapper>
        <Masthead
          title="Level One - Spanish"
          subtitle="Learn the Spanish alphabet"
        />
        <Info
          subtitle="Alphabet"
          info="Spanish consists of 24 consonants and 5 vowels. We have also included some other common letters that you need to learn for future lessons."
        />
        <Section alignitems="flex-start" maxwidth="1024px">
          <Dictionary
            gridheader="1fr 2fr 1fr"
            gridheader640="1fr 2fr 1fr"
            gridbody="1fr 2fr 1fr"
            gridbody640="0.5fr 1.1fr 0.5fr"
            height="600px"
            term="Consonants"
            definition="Pronunciation"
            media="Play"
            overflowy="scroll">
            <Box>
              <p>b</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                b as in <span style={{color: "red"}}>b</span>
                ed
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="b"
                padding="0"
                src={this.state.b}
              />
            </Box>
            <Box>
              <p>c</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                c as in <span style={{color: "red"}}>c</span>
                esar and c as in c<span style={{color: "red"}}>at</span>
              </p>
            </Box>
            <Box alignitems="flex-start">
              <Box alignitems="flex-start">
                <PlayBox
                  alignitems="flex-start"
                  id="c"
                  padding="0"
                  src={this.state.c}
                />
              </Box>
            </Box>
            <Box>
              <p>d</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                d as in <span style={{color: "red"}}>d</span>
                ear
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="d"
                padding="0"
                src={this.state.d}
              />
            </Box>
            <Box>
              <p>g</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                g as in <span style={{color: "red"}}>g</span>
                ator or h as in <span style={{color: "red"}}>h</span>
                air
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="g"
                padding="0"
                src={this.state.g}
              />
            </Box>
            <Box>
              <p>h</p>
            </Box>
            <Box alignitems="flex-start">
              <p>You do not pronounce this letter</p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="h"
                padding="0"
                src={this.state.h}
              />
            </Box>
            <Box>
              <p>ch</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                ch as in <span style={{color: "red"}}>ch</span>
                air{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="ch"
                padding="0"
                src={this.state.ch}
              />
            </Box>
            <Box>
              <p>j</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                h as in <span style={{color: "red"}}>h</span>
                air{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="j"
                padding="0"
                src={this.state.j}
              />
            </Box>
            <Box>
              <p>k</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                k as in <span style={{color: "red"}}>k</span>
                ite{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="k"
                padding="0"
                src={this.state.k}
              />
            </Box>
            <Box>
              <p>l</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                l as in <span style={{color: "red"}}>l</span>
                ady{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="l"
                padding="0"
                src={this.state.l}
              />
            </Box>
            <Box>
              <p>ll</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                y as in <span style={{color: "red"}}>y</span>
                es{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="ll"
                padding="0"
                src={this.state.ll}
              />
            </Box>
            <Box>
              <p>m</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                m as in <span style={{color: "red"}}>m</span>
                an{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="m"
                padding="0"
                src={this.state.m}
              />
            </Box>
            <Box>
              <p>n</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                n as in <span style={{color: "red"}}>n</span>
                ame{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="n"
                padding="0"
                src={this.state.n}
              />
            </Box>
            <Box>
              <p>ñ</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                onio as in o<span style={{color: "red"}}>nio</span>n{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="ñ"
                padding="0"
                src={this.state.ñ}
              />
            </Box>
            <Box>
              <p>p</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                p as in <span style={{color: "red"}}>p</span>
                ower{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="p"
                padding="0"
                src={this.state.p}
              />
            </Box>
            <Box>
              <p>q</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                k as in <span style={{color: "red"}}>k</span>
                id{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="q"
                padding="0"
                src={this.state.q}
              />
            </Box>
            <Box>
              <p>r</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                r as in <span style={{color: "red"}}>r</span>
                ed{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="r"
                padding="0"
                src={this.state.r}
              />
            </Box>
            <Box>
              <p>rr</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                rr as in pe
                <span style={{color: "red"}}>rr</span>o{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="rr"
                padding="0"
                src={this.state.rr}
              />
            </Box>
            <Box>
              <p>s</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                s as in <span style={{color: "red"}}>s</span>
                ed{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="s"
                padding="0"
                src={this.state.s}
              />
            </Box>
            <Box>
              <p>t</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                t as in <span style={{color: "red"}}>t</span>
                alk{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="t"
                padding="0"
                src={this.state.t}
              />
            </Box>
            <Box>
              <p>v</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                b as in <span style={{color: "red"}}>b</span>
                ed{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="v"
                padding="0"
                src={this.state.v}
              />
            </Box>
            <Box>
              <p>w</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                w as in <span style={{color: "red"}}>w</span>
                ord{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="w"
                padding="0"
                src={this.state.w}
              />
            </Box>
            <Box>
              <p>x</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                h as in <span style={{color: "red"}}>h</span>
                ello{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="x"
                padding="0"
                src={this.state.x}
              />
            </Box>
            <Box>
              <p>y</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                y as in <span style={{color: "red"}}>y</span>
                ellow e as in <span style={{color: "red"}}>e</span>
                at{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="y"
                padding="0"
                src={this.state.y}
              />
            </Box>
            <Box>
              <p>z</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                s as in <span style={{color: "red"}}>s</span>
                un{" "}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="z"
                padding="0"
                src={this.state.z}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section alignitems="flex-start" margin="100px 0 0 0" maxwidth="1024px">
          <Dictionary
            gridheader="1fr 2fr 1fr"
            gridheader640="1fr 2fr 1fr"
            gridbody="1fr 2fr 1fr"
            gridbody640="1fr 2fr 1fr"
            term="Vowels"
            definition="Pronunciation"
            media="Play">
            <Box>
              <p>a</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                a as in b<span style={{color: "red"}}>a</span>
                nana
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="a"
                padding="0"
                src={this.state.a}
              />
            </Box>
            <Box>
              <p>e</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                e as in b<span style={{color: "red"}}>e</span>d
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="e"
                padding="0"
                src={this.state.e}
              />
            </Box>
            <Box>
              <p>i</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                e as in f<span style={{color: "red"}}>e</span>
                ed
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="i"
                padding="0"
                src={this.state.i}
              />
            </Box>
            <Box>
              <p>o</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                o as in <span style={{color: "red"}}>o</span>
                ver
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="o"
                padding="0"
                src={this.state.o}
              />
            </Box>
            <Box>
              <p>u</p>
            </Box>
            <Box alignitems="flex-start">
              <p>
                u as in l<span style={{color: "red"}}>u</span>
                be
              </p>
            </Box>
            <Box alignitems="flex-start">
              <PlayBox
                alignitems="flex-start"
                id="u"
                padding="0"
                src={this.state.u}
              />
            </Box>
          </Dictionary>
        </Section>
        <Section
          alignitems="flex-start"
          height="350px"
          margin="100px 0 0 0"
          maxwidth="1024px">
          <Dictionary
            gridheader="1fr 2fr 1fr"
            gridheader640="1fr 2fr 1fr"
            gridbody="1fr 2fr 1fr"
            gridbody640="1fr 2fr 1fr"
            term="Greetings"
            definition="Pronunciation"
            media="Play">
            <Box>
              <p>hola</p>
            </Box>
            <Box alignitems="flex-start">
              <p>Hello</p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="hello" src={`${hello}`} />
              <PlayButton
                name="hello"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
            <Box>
              <p>
                adiós
                {}
              </p>
            </Box>
            <Box alignitems="flex-start">
              <p>Bye</p>
            </Box>
            <Box alignitems="flex-start">
              <audio id="bye" src={`${bye}`} />
              <PlayButton
                name="bye"
                onClick={this.onClick}
                padding="0"
                src={`${PlayImg}`}
              />
            </Box>
          </Dictionary>
        </Section>
        <RememberSection
          list={[
            "Vowels are never silent and are always pronounced.",
            "Vowels are never silent and are always pronounced.Vowels are never silent and are always pronounced."
          ]}
        />
        <Section background="green" height="600px" maxwidth="1024px">
          <Box>
            <Text fontsize="3rem" fontweight="900" color="white">
              <NavLink
                style={{fontSize: "40px", color: "white"}}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpanishLevel1)
