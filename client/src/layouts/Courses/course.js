import React, {Component} from 'react'
import {NavLink, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import data from './data/data.js'
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

class Courses extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const courses = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'}
      }
    ]
    const terms = [
      {
        Header: 'word',
        accessor: 'word' // String-based value accessors!
      },
      {
        Header: 'translation',
        accessor: 'translation',
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: 'someNumber', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      }
    ]
    return (
      <Flex>
        <Title>Create Your Course</Title>
        <ReactTable
          data={data.courses}
          className="-highlight"
          columns={courses}
          defaultPageSize={10}
          SubComponent={row => {
            return (
              <div>
                <div style={{padding: '20px'}}>Terms</div>
                <ReactTable
                  style={{padding: '20px'}}
                  data={data.terms}
                  className="-striped -highlight"
                  columns={terms}
                  defaultPageSize={10}
                  showPagination={false}
                />
                <div style={{padding: '20px'}}>Phrases</div>
                <ReactTable
                  style={{padding: '20px'}}
                  data={data.terms}
                  className="-striped -highlight"
                  columns={terms}
                  defaultPageSize={10}
                  showPagination={false}
                />
              </div>
            )
          }}
        />
      </Flex>
    )
  }
}

class Create extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const levels = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'}
      }
    ]
    const terms = [
      {
        Header: 'word',
        accessor: 'word' // String-based value accessors!
      },
      {
        Header: 'translation',
        accessor: 'translation',
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: 'someNumber', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      }
    ]
    return (
      <Flex>
        <Title>Create Your Course</Title>
        <ReactTable
          data={data.levels}
          className="-highlight"
          columns={levels}
          defaultPageSize={10}
          SubComponent={row => {
            return (
              <div>
                <div style={{padding: '20px'}}>Terms</div>
                <ReactTable
                  style={{padding: '20px'}}
                  data={data.terms}
                  className="-striped -highlight"
                  columns={terms}
                  defaultPageSize={10}
                  showPagination={false}
                />
                <div style={{padding: '20px'}}>Phrases</div>
                <ReactTable
                  style={{padding: '20px'}}
                  data={data.terms}
                  className="-striped -highlight"
                  columns={terms}
                  defaultPageSize={10}
                  showPagination={false}
                />
              </div>
            )
          }}
        />
      </Flex>
    )
  }
}

const StyledSubtitle = styled(Subtitle)`
  text-align: left;
  font-color: #2196f3;
  font-size: 1.2rem;
`
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
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`

class CreateCourseContainer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const levels = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'}
      }
    ]
    const terms = [
      {
        Header: 'word',
        accessor: 'word' // String-based value accessors!
      },
      {
        Header: 'translation',
        accessor: 'translation',
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: 'someNumber', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      }
    ]
    return (
      <StyledGrid>
        <Staticbar>
          <Section>
            <Column>
              <StyledSubtitle>
                <StyledNavLink to="/course/mycourses">My Courses</StyledNavLink>
              </StyledSubtitle>
            </Column>
            <Column>
              <StyledSubtitle>
                <StyledNavLink to="/course/create">
                  Create a Course
                </StyledNavLink>
              </StyledSubtitle>
            </Column>
          </Section>
        </Staticbar>
        <Section gridarea="content">
          <Route path="/course/my-courses" component={Courses} />
          <Route path="/course/create" component={Create} />
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
    actions: {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateCourseContainer
)
