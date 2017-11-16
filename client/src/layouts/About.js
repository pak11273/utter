import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Box, MastheadTitle, MastheadSubtitle, Wrapper} from '../components'

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead height="100vh" background="black">
          <Box maxwidth="1024px">
            <MastheadTitle>
              About Us
            </MastheadTitle>
            <MastheadSubtitle>
              We foster the greatest learning tool you have available
              already-Your brain. Our techniques allow you to naturally
              learn something at the highest level possible. No tricks, no
              gimmicks.
            </MastheadSubtitle>
            <MastheadSubtitle>
              Our goal is to bring peace to the world by language. As the
              world
              has become more global, one of the major problems we have is
              misunderstandings due to cultural differences. Language happens
              to
              be the biggest cultural gap between nations and it's our desire
              to
              see that change. But learning a new language is a very difficult
              and hard to become fluent in. We make every endeavor to not make
              it any simpler, but to make it more available and more efficient
              to learn.
            </MastheadSubtitle>
          </Box>
        </Masthead>
      </Wrapper>
    )
  }
}

export default About
