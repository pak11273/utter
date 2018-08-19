import React, {Component} from 'react'
import {NavLink, Route, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import cuid from 'cuid'
import {validateInput} from '../../../utils/validations/courseUpdate.js'
import '../styles.css'

import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Flex,
  Form,
  Grid,
  Img,
  Section,
  Subtitle,
  Title,
  Text
} from '../../../components'
import {Masthead, Navbar, Staticbar, TabBarContainer} from '../../../containers'

import {Header, Container, Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

// actions
import {addFlashMessage} from '../../../app/actions/flashMessages.js'
import {
  addCuidToLevels,
  addLevel,
  addWord,
  deleteLevel,
  chooseCourseLanguage,
  readCourse,
  updateCourse
} from '../actions'

import {toggleFooter} from '../../../app/actions/toggleFooterAction.js'

const Pending = () => <h1>pending</h1>

const StyledButton = styled(Button)`
  border-radius: 50px;
  color: #02598b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 80px 0 0 0;
  outline: none;
  padding: 7px 36px;
  &:hover {
    background: #4fa0d1;
    color: #ecf12a;
  }
`
const Delete = styled.a`
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    text-decoration: none;
  }
`
const Error = styled.div`
  color: red;
  padding-top: ${props => props.paddingtop};
  position: absolute;
  text-align: center;
`

import CourseSettings from './CourseSettings.js'

import Levels from '../../Levels/components'

import Terms from '../../Terms/components'

class CourseEdit extends Component {
  constructor() {
    super()
    this.state = {
      course_id: '',
      courseName: '',
      courseDescription: '',
      errors: {},
      filtered: false,
      levels: [{level: 1, cuid: cuid()}],
      loading: false,
      page: 0,
      pages: -1,
      pageSize: 1,
      sorted: null
    }
    ;['deleteLevel', 'addWord'].forEach(prop => {
      this[prop] = this[prop].bind(this)
    })

    // this.deleteLevel = this.deleteLevel.bind(this)
    // this.addWord = this.addWord.bind(this)
  }

  componentDidMount() {
    const currentCourse = this.props.courseReducer.currentTeachingCourse
    this.setState(currentCourse)
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  deleteLevel(id) {
    let course = this.props.courseReducer.currentTeachingCourse
    confirm('Are you sure you want to DELETE this level?')
      ? this.props.actions.deleteLevel(course, id)
      : null
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.isValid()) {
      let updatedCourse = this.props.courseReducer.currentTeachingCourse
      this.props.actions.updateCourse(updatedCourse)

      // clear errors
      this.setState({
        errors: {} // clear errors every time we submit form
      })

      this.props.actions.addFlashMessage({
        type: 'success',
        text: 'Changes were saved.'
      })
    }
  }

  addLevel = e => {
    e.preventDefault()
    let length = this.props.courseReducer.currentTeachingCourse.levels.length
    let newLevel = length + 1
    this.props.actions.addLevel(newLevel)
  }

  addWord = e => {
    e.preventDefault()
    this.props.actions.addWord()
  }

  getData() {
    const data = testData.map(item => {
      const _id = cuid()
      return {
        _id,
        ...item
      }
    })
    return data
  }

  isValid() {
    const {errors, isValid} = validateInput(
      this.props.courseReducer.currentTeachingCourse
    )

    if (!isValid) {
      this.setState({
        errors
      })
    } else {
      return isValid
    }
  }

  render() {
    // const url = `/api/courses/${
    //   this.props.courseReducer.currentTeachingCourse.courseId
    // }/${this.props.courseReducer.currentTeachingCourse.courseName}`

    const tabs = [
      {name: 'settings', label: 'Settings', component: CourseSettings},
      {name: 'levels', label: 'Levels', component: Levels},
      {name: 'terms', label: 'Terms', component: Terms}
      // {
      //   name: 'unitOrganization',
      //   label: 'Unit Organization',
      //   component: UnitOrganization
      // },
    ]

    return (
      <Flex>
        {/* TODO: implement after chat is finsished 
        <Box flexdirection640="row">
          <h1>Course Name</h1>
          <h1>Course Description</h1>
          <Img width="30px" height="40px" />
          <Button onClick={this.deleteCourse}>Delete Course</Button>
          <p>
            <span style={{color: 'red'}}>
              Note: This action cannot be reversed.
            </span>
          </p>
        </Box>
        <Form onSubmit={this.onSubmit}>
        */}
        <div>
          <Title padding="20px">Your Course Details</Title>
          <div className="App">
            <div className="App-header">
              <Header inverted as="h1">
                Project Mini-Mek
              </Header>
            </div>
            <Container>
              <TabBarContainer tabs={tabs} size="massive" />
            </Container>
          </div>
        </div>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addCuidToLevels,
        addFlashMessage,
        addLevel,
        addWord,
        deleteLevel,
        toggleFooter,
        readCourse,
        updateCourse
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseEdit)
)
