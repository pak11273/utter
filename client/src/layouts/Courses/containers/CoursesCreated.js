import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import orm from '../../../app/schema.js'
import {isEmpty} from 'lodash/isEmpty'
import styled, {ThemeProvider} from 'styled-components'
import {Card, Container, Grid as SGrid, Icon, Image} from 'semantic-ui-react'
import Pagination from '../../../containers/Pagination'
// import {Pagination} from '../../../containers'
import {Box, Flex, Grid, Img, Title, Text} from '../../../components'
import IoPeople from 'react-icons/lib/io/android-people'
import '../../../assets/css/pagination.css'

// actions
import {toggleFooter} from '../../../app/actions/toggleFooterAction.js'
import course from '../../../api/course/actions/courseActions.js'
// import {getTeachingList, readCourse} from '../actions.js'

const StyledGrid = styled(Grid)`
  grid-template-columns: 100%;
  grid-template-rows: auto 60px;
  grid-template-areas:
    'content'
    'Pagination';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-rows: auto 60px;
  }
`
const teachingCard = styled(Grid)`
  background: blue;
  max-width: 300px;
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`

class Created extends Component {
  constructor(props) {
    super(props) // an example array of 150 items to be paged
    // var exampleItems = [...Array(20).keys()].map(i => ({
    //   id: i + 1,
    //   name: 'Item ' + (i + 1)
    // }))
    this.state = {
      courseCreatorId: '',
      courseId: '',
      courseName: '',
      page: 1,
      total: 10,
      exampleItems: [],
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.list = props.courseReducer.teachingCourseList
    this.pushUrl = this.pushUrl.bind(this)
  }

  pushUrl(item) {
    let url = `/my-courses/${item.courseId}/${item.courseName}/edit`
    // this.props.actions.readCourse(item)
    this.props.actions.push(url)
  }

  componentWillMount() {
    // this.props.actions.getTeachingList()
  }
  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({pageOfItems: pageOfItems})
  }

  onClick(e, item) {
    e.preventDefault()
    const courseCreatorId = this.props.user.id
    const courseId = item.courseId
    const courseName = item.courseName
    this.setState(
      {
        courseCreatorId,
        courseId,
        courseName
      },
      function() {
        this.props.actions.fetchTeachingCourse(this.state)
      }
    )
  }

  render() {
    // if (this.props.courseReducer.teachingCourseList.result.docs) {
    //   var courses = this.props.courseReducer.teachingCourseList.result.docs
    // }
    const LangCard = this.props.courses.map(item => {
      return (
        <Card key={item.id}>
          <div className="image">
            <Image
              src={item.image}
              onClick={e => this.onClick(e, item)}
              style={{cursor: 'pointer'}}
            />
          </div>
          <Card.Content>
            <Card.Header
              onClick={e => this.onClick(e, item)}
              style={{cursor: 'pointer', hover: 'underline'}}>
              {item.courseName}
            </Card.Header>
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
    return (
      <Grid gridarea="content">
        <Flex padding="50px 0 0 0">
          <Title>Edit a Course</Title>
          <Container>
            <Card.Group itemsPerRow={3}>{LangCard}</Card.Group>
            <Pagination defaultActivePage={1} totalPages={10} />
          </Container>
        </Flex>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Courses} = session
  const {User} = session
  const courses = Courses.all().toRefArray()
  const users = User.all().toRefArray()
  const user = users[0]
  return {
    user,
    courses,
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // getTeachingList,
        fetchTeachingCourse: course.request,
        push,
        // readCourse,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Created))
