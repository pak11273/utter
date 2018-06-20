import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
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
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'

const StyledGrid = styled(Grid)`
  grid-template-areas:
    'sidebar sidebar'
    'content content';
  height: 700px;

  @media (min-width: 640px) {
    grid-template-columns: 200px 1fr;
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 20px;

  &:hover {
    color: #ff9800;
  }
`
class CoursesContainer extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      selectedOption: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  handleOptionChange = selectedOption => {
    this.setState({selectedOption})
    console.log(`Selected: ${selectedOption.label}`)
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
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
                  {value: 'English', label: 'English'},
                  {value: 'Spanish', label: 'Spanish'}
                ]}
              />
            </Box>
            <Box>
              <StyledNavLink to="/my-courses">My Courses</StyledNavLink>
            </Box>
          </Flex>
        </Staticbar>
        <Grid gridarea="content">
          <Flex padding="50px 0 0 0">
            <Title>Enroll in a Course</Title>
            <Subtitle>Choose from several languages</Subtitle>
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
    actions: bindActionCreators(
      {
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
)
