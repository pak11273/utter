import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
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

const initialState = {
  search: '',
  courseAuthor: '',
  courseInput: '',
  courseName: '',
  courseProp: 'title',
  couresRef: '',
  teachingLang: '',
  nativeLang: '',
  items: '',
  limit: 3,
  next: ''
}

class CoursesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    this.props.actions.resetCourses()
    this.props.actions.courses(this.state)
  }

  handleSpeakingChange = nativeLang => {
    if (nativeLang === null) {
      const newState = update(this.state, {
        nativeLang: {$set: ''}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        nativeLang: {$set: nativeLang.value}
      })

      this.setState(newState)
      // Make api call
      // TODO this.props.actions.courses(this.state)
    }
  }

  handleTeachingChange = teachingLang => {
    if (teachingLang === null) {
      const newState = update(this.state, {
        teachingLang: {$set: ''}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        teachingLang: {$set: teachingLang.value}
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

  handleImageClick = e => {
    e.preventDefault()
    // go to edit page and load redux with course
    // TODO this.props.actions.course(this.state)
  }

  handleCourseFilterChg = (e, data) => {
    const newState = update(this.state, {
      courseProp: {$set: data.value}
    })
    this.setState(newState)
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    const newState = update(this.state, {
      courseInput: {$set: data.value}
    })

    this.setState(newState)
  }

  submitQuery = e => {
    e.preventDefault()

    // change state props based on courseProp
    const courseProp = this.state.courseProp
    const courseInput = this.state.courseInput
    switch (courseProp) {
      case 'title':
        // set courseName
        let newName = update(this.state, {
          courseAuthor: {
            $set: ''
          },
          courseName: {
            $set: courseInput
          },
          courseRef: {
            $set: ''
          },
          next: {
            $set: ''
          }
        })

        this.setState(newName, () => {
          this.props.actions.resetCourses()
          this.props.actions.courses(this.state)
        })

        break

      case 'reference':
        // set courseRef
        let newRef = update(this.state, {
          courseAuthor: {
            $set: ''
          },
          courseName: {
            $set: ''
          },
          courseRef: {
            $set: courseInput
          },
          next: {
            $set: ''
          }
        })

        this.setState(newRef, () => {
          this.props.actions.resetCourses()
          this.props.actions.courses(this.state)
        })
        break

      case 'author':
        // set courseAuthor

        let newAuthor = update(this.state, {
          courseAuthor: {
            $set: courseInput
          },
          courseName: {
            $set: ''
          },
          courseRef: {
            $set: ''
          },
          next: {
            $set: ''
          }
        })

        this.setState(newAuthor, () => {
          this.props.actions.resetCourses()
          this.props.actions.courses(this.state)
        })
        break
    }
  }

  nextCourses = ({previousPos, currentPosition, event}) => {
    const newNext = this.props.coursesMeta.next
    // add next to local state
    const newState = update(this.state, {
      next: {$set: newNext}
    })
    this.setState(newState, () => {
      // api more courses
      this.props.actions.courses(this.state)
    })
  }

  handleWaypoint = () => {
    if (
      !this.props.coursesMeta.loading &&
      this.props.coursesMeta.next !== 'done'
    ) {
      return <Waypoint onEnter={this.nextCourses} />
    }
  }

  render() {
    const LangCard = this.props.courses.map(item => {
      var author = ''
      item.courseAuthor.username ? (author = item.courseAuthor.username) : null
      return (
        <Card key={item.id}>
          <Image
            src={item.image}
            onClick={this.handleImageClick}
            style={{cursor: 'pointer'}}
          />
          <Card.Content>
            <Card.Header>{item.courseName}</Card.Header>
            <Card.Meta>
              <Icon name="pencil" />
              <a style={{padding: '0 20px 0 0'}}>{author}</a>
            </Card.Meta>
            <div className="description">{item.courseDescription}</div>
            {/* TODO
            <div
              style={{
                color: 'white',
                background: 'red',
                padding: '4px',
                textAlign: 'center'
              }}>
              Subscribed
            </div>
            */}
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            <span style={{padding: '0 20px 0 0'}}>22 Subscribers</span>
            <p>
              <Icon name="book" />
              <span style={{padding: '0 20px 0 0'}}>{item.courseRef}</span>
            </p>
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

    renderGrid = (
      <div>
        <SemGrid style={{padding: '40px'}}>
          <Card.Group stackable itemsPerRow={3}>
            {LangCard}
          </Card.Group>
        </SemGrid>
        {this.handleWaypoint()}
        {scrollMsg}
      </div>
    )

    return (
      <StyledGrid>
        <Staticbar>
          <Flex gridarea="sidebar">
            <Subtitle>I speak:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.nativeLang}
                onChange={this.handleSpeakingChange}
                options={[
                  {value: 'english', label: 'English'},
                  {value: 'spanish', label: 'Spanish'},
                  {value: 'french', label: 'French'}
                ]}
              />
            </Box>
            <Subtitle>I want to learn:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.teachingLang}
                onChange={this.handleTeachingChange}
                options={[
                  {value: 'korean', label: 'Korean'},
                  {value: 'english', label: 'English'},
                  {value: 'spanish', label: 'Spanish'}
                ]}
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
                defaultValue="title"
              />
              <Button onClick={this.submitQuery}>Search</Button>
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
