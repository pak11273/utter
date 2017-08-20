import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../../containers/Wrappers/Wrapper.js'
import Section from '../../containers/Sections/Section.js'
import Navbar from '../../containers/Navbars/Navbar'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'

class KoreanLevel1 extends Component {
  render() {
    return (
      <Wrapper>
        <Section bg="green">
          <Title>Level One - Building Vocabulary</Title>
          <Subtitle>
            Hangul for the simple minded for:
          </Subtitle>
          <Title>Vocabulary</Title>
          <Subtitle>Basic Words</Subtitle>
          <Subtitle>Foods</Subtitle>
          <ol>
            <li>pap</li>
          </ol>
          <Subtitle>Family</Subtitle>
          <ol>
            <li>heung</li>
          </ol>
          <Title>Grammar</Title>
          <Subtitle>Family</Subtitle>
          <ol>
            <li>ahbugi</li>
          </ol>
          <Title>Speak</Title>
        </Section>
      </Wrapper>
    )
  }
}

export default KoreanLevel1
