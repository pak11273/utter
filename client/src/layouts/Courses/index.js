import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css' // comment out exclude node_modules for css-loader
import styled, {ThemeProvider} from 'styled-components'

import './styles.css'
import {
  Box,
  Button,
  ButtonBrowse,
  Flex,
  Form,
  Grid,
  Input,
  Label,
  LanguageCard,
  Subtitle,
  Title
} from '../../components'

import {Masthead, Navbar, Staticbar} from '../../containers'
// actions
import {chooseCourseLanguage} from './actions'

// const StyledField = styled(Field)``

const StyledGrid = styled(Grid)`
  grid-template-columns: 20% 80%;
  grid-template-areas:
    'sidebar sidebar'
    'content content';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-areas: 'sidebar content';
  }
`

const StyledNavLink = styled(NavLink)`
  padding: 20px;
  font-size: 1.5rem;
  &:visited {
    color: blue;
  }
  &:hover {
    color: green;
  }
`

class CoursesContainer extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      selectedOption: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleOptionChange = selectedOption => {
    this.setState({selectedOption})
    console.log(`Selected: ${selectedOption.label}`)
  }

  render() {
    const {selectedOption} = this.state
    const value = selectedOption && selectedOption.value

    return (
      <StyledGrid>
        <Staticbar>
          <Flex gridarea="sidebar">
            <Subtitle>I speak:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={[
                  {value: 'one', label: 'One'},
                  {value: 'two', label: 'Two'}
                ]}
              />
            </Box>
            <Box>
              <StyledNavLink to="/courses/my-courses">
                My Created Courses
              </StyledNavLink>
            </Box>
          </Flex>
        </Staticbar>
        <Grid gridarea="content">
          <Flex>
            <Title>Enroll in a Course</Title>
            <Subtitle>Choose from several languages</Subtitle>
          </Flex>
          <Flex flexdirection="row" justifycontent="center">
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
          </Flex>
        </Grid>
      </StyledGrid>
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
