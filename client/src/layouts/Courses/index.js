import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select'
import isEmpty from 'lodash/isEmpty'
import Waypoint from 'react-waypoint'
import update from 'immutability-helper'
import {
  Card,
  Dropdown,
  Grid as SemGrid,
  Icon,
  Image,
  Input,
  Item,
  Segment,
  Select as SemSelect,
  Text
} from 'semantic-ui-react'
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
  Label,
  Subtitle,
  Title
} from '../../components'

import {Masthead, Navbar, Staticbar} from '../../containers'
import orm from '../../app/schema.js'

// actions
import course from '../../api/course/actions/courseActions.js'
import courses from '../../api/courses/actions/coursesActions.js'
import {chooseCourseLanguage} from './actions'
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'

const options = [
  {key: 'all', text: 'All', value: 'all'},
  {key: 'title', text: 'Title', value: 'title'},
  {key: 'reference', text: 'Reference', value: 'reference'},
  {key: 'author', text: 'Author', value: 'author'}
]

const StyledGrid = styled(Grid)`
  grid-template-areas:
    'sidebar sidebar';
    'content content';

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
    this.onClick = this.onClick.bind(this)
  }

  state = {
    search: '',
    query: {
      courseName: '',
      courseProp: 'all',
      learningLang: 'korean',
      nativeLang: 'english',
      items: '',
      limit: 3,
      previous: '',
      hasPrevious: '',
      next: ''
    }
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    this.props.actions.resetCourses()
    this.props.actions.courses(this.state)
  }

  handleSpeakingChange = nativeLang => {
    if (nativeLang === null) {
      const newState = update(this.state, {
        query: {
          nativeLang: {$set: ''}
        }
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        query: {
          nativeLang: {$set: nativeLang.value}
        }
      })

      this.setState(newState)
      // Make api call
      // TODO this.props.actions.courses(this.state)
    }
  }

  handleLearningChange = learningLang => {
    if (learningLang === null) {
      const newState = update(this.state, {
        query: {
          learningLang: {$set: ''}
        }
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        query: {
          learningLang: {$set: learningLang.value}
        }
      })

      this.setState(newState)
      // Make api call
      //TODO   this.props.actions.courses(this.state)
    }
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  onClick(e) {
    e.preventDefault()
    // go to edit page and load redux with course
    // TODO this.props.actions.course(this.state)
  }

  handleCourseFilterChg = (e, data) => {
    const newState = update(this.state, {
      query: {
        courseProp: {$set: data.value}
      }
    })
    this.setState(newState)
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    console.log('data: ', data.value)
    const newState = update(this.state, {
      query: {
        courseName: {$set: data.value}
      }
    })

    this.setState(newState)
  }

  submitQuery = e => {
    e.preventDefault()
    console.log('submitQuery: ', this.state)
    this.props.actions.courses(this.state)
  }

  nextCourses = () => {
    const newNext = this.props.coursesMeta.next
    // add next to local state
    const newState = update(this.state, {
      query: {
        next: {$set: newNext}
      }
    })
    this.setState(newState, () => {
      // api more courses
      this.props.actions.courses(this.state)
    })
  }

  handleWaypoint = () => {
    console.log('way')
  }

  waypoint = () => {
    if (
      !this.props.coursesMeta.loading &&
      this.props.coursesMeta.next !== 'done'
    ) {
      return <Waypoint onEnter={this.nextCourses} />
    }
  }

  render() {
    const LangCard = this.props.courses.map(item => {
      return (
        <Card key={item.id}>
          <Image
            src={item.image}
            onClick={this.onClick}
            style={{cursor: 'pointer'}}
          />
          <Card.Content>
            <Card.Header>{item.courseName}</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2013</span>
            </Card.Meta>
            <div className="description">{item.courseDescription}</div>
          </Card.Content>
          <Card.Content extra>
            <a style={{padding: '0 20px 0 0'}}>
              <Icon name="user" />
              22 Subscribers
            </a>
            <span style={{color: 'white', background: 'red', padding: '4px'}}>
              Subscribed
            </span>
          </Card.Content>
        </Card>
      )
    })
    if (this.props.coursesMeta.next !== 'done') {
      var scrollMsg = (
        <SemGrid centered style={{margin: '0 0 40px 0'}}>
          <Segment compact loading={this.props.coursesMeta.loading}>
            Scroll down for more
          </Segment>
        </SemGrid>
      )
    } else {
      var scrollMsg = <div />
    }
    var renderGrid
    if (isEmpty(this.props.courses)) {
      renderGrid = (
        <Grid>
          <Item align="center">
            <h1>There are currently no courses created for this lanugage.</h1>
          </Item>
        </Grid>
      )
    } else {
      renderGrid = (
        <div>
          <SemGrid style={{padding: '40px'}}>
            <Card.Group stackable itemsPerRow={3}>
              {LangCard}
            </Card.Group>
          </SemGrid>
          {scrollMsg}
          {this.waypoint()}
        </div>
      )
    }

    return (
      <StyledGrid>
        <Staticbar>
          <Flex gridarea="sidebar">
            <Subtitle>I speak:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.query.nativeLang}
                onChange={this.handleSpeakingChange}
                options={[{value: 'english', label: 'English'}]}
              />
            </Box>
            <Subtitle>I want to learn:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.query.learningLang}
                onChange={this.handleLearningChange}
                options={[{value: 'Korean', label: 'Korean'}]}
              />
            </Box>
            <Box>
              <StyledNavLink to="/courses/123">My Courses</StyledNavLink>
            </Box>
          </Flex>
        </Staticbar>
        <Grid gridarea="content" gridtemplaterows="100px auto">
          <Item align="center">
            <Title>Subscribe to a Course</Title>
            <Input
              type="text"
              placeholder="Search..."
              onChange={this.handleInputChg}
              action>
              <input />
              <SemSelect
                onChange={this.handleCourseFilterChg}
                options={options}
                defaultValue="all"
              />
              <Button onClick={this.submitQuery} type="submit">
                Search
              </Button>
            </Input>
          </Item>
          {renderGrid}
        </Grid>
      </StyledGrid>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Courses} = session
  const courses = Courses.all().toRefArray()
  return {
    courses,
    coursesMeta: state.coursesReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        course: course.request,
        courses: courses.request,
        resetCourses: courses.reset,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoursesContainer)
)
