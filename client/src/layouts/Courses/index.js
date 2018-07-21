import React, {Component} from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Select from 'react-select'
import {Card, Container, Grid as SGrid, Icon, Image} from 'semantic-ui-react'
import Pagination from '../../containers/Pagination'
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
import orm from '../../app/schema.js'

// actions
import course from '../../api/course/actions/courseActions.js'
import courses from '../../api/courses/actions/coursesActions.js'
import {chooseCourseLanguage} from './actions'
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'

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
  padding: 20px;

  &:hover {
    color: #ff9800;
  }
`
class CoursesContainer extends Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
    this.handleSpeakingChange = this.handleSpeakingChange.bind(this)
    this.handleLearningChange = this.handleLearningChange.bind(this)
  }

  state = {
    search: '',
    learningOption: '',
    speakingOption: ''
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    this.props.actions.courses(this.state)
  }

  handleSpeakingChange = speakingOption => {
    this.setState({speakingOption})
    // Make api call
    this.props.actions.courses(this.state)
  }

  handleLearningChange = learningOption => {
    this.setState({learningOption})
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  onClick(e) {
    e.preventDefault()
    // go to edit page and load redux with course
    this.props.actions.course(this.state)
  }

  render() {
    const LangCard = this.props.courses.map(item => {
      return (
        <Card key={item.id}>
          <div className="image">
            <Image
              src={item.image}
              onClick={this.onClick}
              style={{cursor: 'pointer'}}
            />
          </div>
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
    return (
      <StyledGrid>
        <Staticbar>
          <Flex gridarea="sidebar">
            <Subtitle>I speak:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.speakingOption}
                onChange={this.handleSpeakingChange}
                options={[{value: 'English', label: 'English'}]}
              />
            </Box>
            <Subtitle>I want to learn:</Subtitle>
            <Box>
              <Select
                name="form-field-name"
                value={this.state.learningOption}
                onChange={this.handleLearningChange}
                options={[{value: 'Korean', label: 'Korean'}]}
              />
            </Box>
            <Box>
              <StyledNavLink to="/my-courses">My Courses</StyledNavLink>
            </Box>
          </Flex>
        </Staticbar>
        <Grid gridarea="content">
          <Flex padding="50px 0 0 0">
            <Title>Subscribe to a Course</Title>
            <Subtitle>Filter: My Subscriptions</Subtitle>
            <Container>
              <Card.Group itemsPerRow={3}>{LangCard}</Card.Group>
              <Pagination defaultActivePage={1} totalPages={10} />
            </Container>
          </Flex>
        </Grid>
      </StyledGrid>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Courses} = session
  const courses = Courses.all().toRefArray()
  return {courses}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        course: course.request,
        courses: courses.request,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
)
