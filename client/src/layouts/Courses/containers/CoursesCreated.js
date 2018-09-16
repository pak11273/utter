import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import update from 'immutability-helper'
import Waypoint from 'react-waypoint'
import Select from 'react-select'
import orm from '../../../app/schema.js'
import {isEmpty} from 'lodash/isEmpty'
import styled, {ThemeProvider} from 'styled-components'
import {
  Card,
  Container,
  Grid as SemGrid,
  Button,
  Icon,
  Image,
  Item,
  Segment
} from 'semantic-ui-react'
import {Staticbar} from '../../../containers'
import {Box, Flex, Grid, Img, Subtitle, Title, Text} from '../../../components'
import IoPeople from 'react-icons/lib/io/android-people'
import '../../../assets/css/pagination.css'

// actions
import {toggleFooter} from '../../../app/actions/toggleFooterAction.js'
import courses from '../../../api/courses/actions/coursesActions.js'
import course from '../../../api/course/actions/courseActions.js'

const StyledGrid = styled(Grid)`
  grid-template-areas:
    'sidebar sidebar';
    'content content';
  height: 700px;

  @media (min-width: 640px) {
    grid-template-columns: 200px 1fr;
    grid-template-areas: 'sidebar content';
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`
const initialState = {
  search: '',
  courseAuthor: 'brad',
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

class Created extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    const newState = update(this.state, {
      courseAuthor: {$set: this.props.user.username}
    })

    this.setState(newState, () => {
      this.props.actions.resetCourses()
      this.props.actions.fetchCourses(this.state)
    })
  }

  onClick(e, item) {
    e.preventDefault()
  }

  nextCourses = ({previousPos, currentPosition, event}) => {
    const newNext = this.props.coursesMeta.next
    // add next to local state
    const newState = update(this.state, {
      next: {$set: newNext}
    })
    this.setState(newState, () => {
      // api more courses
      this.props.actions.fetchCourses(this.state)
    })
  }

  handleClick = (e, data) => {
    e.preventDefault()

    const newState = update(this.state, {
      courseAuthorId: {$set: this.props.user.id},
      courseId: {$set: data.item.id},
      courseName: {$set: data.item.courseName}
    })

    this.setState(newState, () => {
      this.props.actions.fetchTeachingCourse(this.state)
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
    // if (this.props.courseReducer.teachingCourseList.result.docs) {
    //   var courses = this.props.courseReducer.teachingCourseList.result.docs
    // }
    const LangCard = this.props.courses.map(item => {
      var author = ''
      item.courseAuthor.username ? (author = item.courseAuthor.username) : null
      let keys = []
      item.courseRef.map(item => {
        keys.push(item.value)
      })
      const courseRef = keys.toString()
      return (
        <Card key={item.id}>
          <Image
            src={item.courseImage}
            onClick={this.handleClick}
            style={{cursor: 'pointer'}}
          />
          <Card.Content>
            <Card.Header style={{wordBreak: 'break-word'}}>
              <Button onClick={this.handleClick} item={item}>
                {item.courseName}
              </Button>
            </Card.Header>
            <Card.Meta>
              <Icon name="pencil" />
              <a style={{padding: '0 20px 0 0'}}>{author}</a>
            </Card.Meta>
            <div className="description" style={{wordBreak: 'break-word'}}>
              {item.courseDescription}
            </div>
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
            <span style={{padding: '0 20px 0 0'}}>{item.subscribers}</span>
            <p>
              <Icon name="book" />
              <span style={{padding: '0 20px 0 0'}}>{courseRef}</span>
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
            <Box>
              <StyledNavLink to="/courses/create">
                Create a Course
              </StyledNavLink>
            </Box>
          </Flex>
        </Staticbar>
        <Grid gridarea="content" gridtemplaterows="100px auto">
          <Item align="center">
            <Title>Edit a Course</Title>
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
  const {User} = session
  const courses = Courses.all().toRefArray()
  const users = User.all().toRefArray()
  const user = users[0] || ''
  return {
    user,
    courses,
    courseReducer: state.courseReducer,
    coursesMeta: state.coursesReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchCourses: courses.request,
        fetchTeachingCourse: course.request,
        push,
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
  )(Created)
)
