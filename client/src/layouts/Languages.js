import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {
  Box,
  Button,
  Column,
  Section,
  Input,
  LanguageCard,
  Wrapper
} from '../components'
import {Masthead} from '../containers'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

class Languages extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <Wrapper width="960px">
        <Masthead height="250px">
          <Title>Languages</Title>
          <Subtitle>
            Choose from several languages
          </Subtitle>
          {this.state.search}
          <Box flexdirection="row">
            <Input
              onChange={this.handleSearch}
              margin="0 10px 0 0"
              type="text"
              placeholder="search"
            />
            <Button
              color="black"
              fontsize="1.4rem"
              fontweight="500"
              width="140px"
              height="40px">
              Browse All
            </Button>
          </Box>
        </Masthead>
        <Section width="960px">
          <Column
            flexdirection="row"
            flexwrap="wrap"
            justyifycontent="space-between"
            width="832px">
            {this.props.languages
              .filter(language => {
                return (
                  `${language.name}`
                    .toUpperCase()
                    .indexOf(this.state.search.toUpperCase()) >= 0
                )
              })
              .map(language => {
                return <LanguageCard {...language} />
              })}
          </Column>
        </Section>
      </Wrapper>
    )
  }
}

export default Languages
