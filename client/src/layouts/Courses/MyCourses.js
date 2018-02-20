import React, {Component} from 'react'
import {NavLink, Link, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import ReactTable from 'react-table'
import Create from './containers/Create.js'
import Created from './Created.js'
import Edit from './Edit.js'
import 'react-table/react-table.css'
import data from './data'

import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Flex,
  Grid,
  Section,
  Input,
  LanguageCard,
  Subtitle,
  Title
} from '../../components'
import {Masthead, Navbar, Staticbar} from '../../containers'

// actions
import {chooseCourseLanguage} from './actions'
import {toggleFooter} from '../../actions/toggleFooterAction.js'

const StyledSubtitle = styled(Subtitle)`
  text-align: left;
  font-color: #2196f3;
  font-size: 1.2rem;
  padding: ${props => props.padding};
`
StyledSubtitle.defaultProps = {
  padding: '20px 0 0 20px'
}

const StyledGrid = styled(Grid)`
  grid-template-areas:
    'sidebar sidebar'
    'content content';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: #ff9800;
  }
`

class MyCourses extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    return (
      <StyledGrid>
        <Staticbar>
          <Section>
            <Column>
              <StyledSubtitle padding="80px 0 0 20px">
                <StyledNavLink to="/courses/my-courses/created">
                  My Courses
                </StyledNavLink>
              </StyledSubtitle>
              <StyledSubtitle padding="20px 0 20px 20px">
                <StyledNavLink to="/courses/my-courses/create">
                  Create a Course
                </StyledNavLink>
              </StyledSubtitle>
            </Column>
          </Section>
        </Staticbar>
        <Section gridarea="content">
          <Route exact path="/courses/my-courses" component={Created} />
          <Route exact path="/courses/my-courses/create" component={Create} />
          <Route exact path="/courses/my-courses/created" component={Created} />
          <Route
            exact
            path="/courses/my-courses/created/edit"
            component={Edit}
          />
        </Section>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses)
