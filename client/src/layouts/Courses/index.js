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
} from '../../components'
import {Masthead, Navbar} from '../../containers'

// actions
import {chooseCourseLanguage} from './actions'

class CoursesContainer extends Component {
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
        <Masthead height="200px">
          <Column minwidth="365px" maxwidth="960px">
            <Title>My Courses</Title>
            <Subtitle>
              Click a course to start learning
            </Subtitle>
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
        <Masthead height="200px">
          <Column minwidth="365px" maxwidth="960px">
            <Title>Enroll in a Course</Title>
            <Subtitle>
              Choose from several languages
            </Subtitle>
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
