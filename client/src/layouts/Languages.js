import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Section,
  Input,
  LanguageCard,
  Subtitle,
  Title,
  Wrapper
} from '../components'
import {Masthead, Navbar} from '../containers'

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
      <Wrapper>
        <Masthead height="400px">
          <Column minwidth="365px" maxwidth="960px">
            <Title>Languages</Title>
            <Subtitle>
              Choose from several languages
            </Subtitle>
            {/* code at bottom of page goes here */}
          </Column>
        </Masthead>
        <Section>
          <Column flexdirection="row" justifycontent="center">
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

// {this.state.search}
// <Box flexdirection="row">
//   <Input
//     onChange={this.handleSearch}
//     margin="0 10px 0 0"
//     type="text"
//     placeholder="search"
//   />
//   <ButtonBrowse>
//     Browse All
//   </ButtonBrowse>
// </Box>
