import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  withRouter,
  NavLink,
  Link,
  Route
} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import Created from './Created.js'
import MyCoursesCreate from './containers/CourseEdit.js'
import Edit from './Edit.js'
import CourseEdit from './containers/CourseEdit.js'
import data from './data'
import requireAuth from '../../utils/requireAuth.js'

const Blah = <h1>Blah!!!</h1>
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
    grid-template-columns: 200px 1fr;
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: #ff9800;
  }
`
const Index = styled.section`
  <h1>My Courses</h1>
`

class MyCourses extends Component {
  constructor(props) {
    super(props)
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
      <Router>
        <StyledGrid>
          <Staticbar>
            <Section>
              <Column>
                <StyledSubtitle padding="80px 0 0 20px">
                  <StyledNavLink to="/my-courses/created">
                    My Courses
                  </StyledNavLink>
                </StyledSubtitle>
                <StyledSubtitle padding="20px 0 20px 20px">
                  <StyledNavLink to="/my-courses/create">
                    Create a Course
                  </StyledNavLink>
                </StyledSubtitle>
              </Column>
            </Section>
          </Staticbar>
          <Section gridarea="content">
            {this.props.routes.map((route, i) => <Route key={i} {...route} />)}
          </Section>
        </StyledGrid>
      </Router>
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
  connect(mapStateToProps, mapDispatchToProps)(MyCourses)
)
