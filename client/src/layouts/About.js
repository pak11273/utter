import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Column, Subtitle, Title, Wrapper} from '../components'

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead height="800px">
          <Column maxwidth="960px">
            <Title>About Us</Title>
            <Subtitle>
              We foster the greatest learning tool you have available
              already-Your brain. Our techniques allow you to naturally
              learn something at the highest level possible. No tricks, no
              gimmicks.
            </Subtitle>
            <Subtitle>
              Our goal is to bring peace to the world by language. As the world
              has become more global, one of the major problems we have is
              misunderstandings due to cultural differences. Language happens to
              be the biggest cultural gap between nations and it's our desire to
              see that change. But learning a new language is a very difficult
              and hard to become fluent in. We make every endeavor to not make
              it any simpler, but to make it more available and more efficient
              to learn.
            </Subtitle>
          </Column>
        </Masthead>
      </Wrapper>
    )
  }
}

export default About
