import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {validateInput} from '../../../utils/validations/courseCreate.js'
import {addFlashMessage} from '../../../app/actions/flashMessages.js'
import validator from 'validator'
import cuid from 'cuid'
import Teaching from './Teaching.js'
import Using from './Using.js'
import '../styles.css'

import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Input,
  Label,
  Searching,
  Span,
  Tags,
  Text,
  TextArea,
  Title
} from '../../../components'

// images
import transLoader from '../../../assets/images/trans_loader.gif'

// actions
import {toggleFooter} from '../../../app/actions/toggleFooterAction.js'
import {
  createCourse,
  fetchCourseName,
  resetCourseCreateForm,
  loadCurrentTeachingCourse
} from '../actions.js'

const StyledButton = styled(Button)`
  border-radius: 50px;
  color: #02598b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 80px 0 0 0;
  outline: none;
  padding: 7px 36px;
  &:hover: {
    background: black;
    color: red;
  }
`
const DisplayCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;

  @media (min-width: 330px) {
    right: 10%;
  }

  @media (min-width: 640px) {
    right: 2%;
  }

  @media (min-width: 740px) {
    right: 10%;
  }
`
const StyledForm = styled(Form)`
  height: 600px;
  margin: 0 auto;
  min-width: 250px;
  width: 70%;
`
const StyledFlex = styled(Flex)`
  grid-area: ${props => props.gridarea};
  margin: ${props => props.margin};
  overflow: initial;
  position: relative;

  @media (min-width: 1080px) {
    margin: ${props => props.margin1080};
  }
`
StyledFlex.defaultProps = {
  margin: '80px 0 0 0'
}

const StyledSpan = styled(Span)`
  display: none;
  font-size: 0.6rem;
  padding: 0 0 0 10px;

  @media (min-width: 640px) {
    display: ${props => props.display640};
  }
`
const Error = styled.div`
  color: red;
  padding-top: ${props => props.paddingtop};
  text-align: center;
`
const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'teaching teaching'
    'using using'
    'tags tags';

  @media (min-width: 1080px) {
    grid-template-areas:
      'teaching using'
      'tags tags';
  }
`
class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charCount: 0,
      courseId: cuid(),
      courseCreatorId: this.props.userReducer.user._id,
      courseDescription: '',
      courseName: '',
      levels: [{level: 1, cuid: cuid()}],
      displayName: '',
      errors: {},
      loading: false,
      tags: [],
      teachingLang: '',
      usingLang: ''
    }
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    this.props.actions.resetCourseCreateForm()
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onBlur = e => {
    this.props.actions.fetchCourseName(this.state.courseName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // this.props.actions.setReducer({
    //   [e.target.name]: e.target.value
    // })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.isValid()) {
      this.props.actions.createCourse(this.state)
      // clear state
      this.setState({
        courseId: '',
        courseCreatorId: '',
        courseName: '',
        charCount: 0,
        courseDescription: '',
        displayName: '',
        errors: {}, // clear errors every time we submit form
        currentTeachingCourse: {},
        loading: false
      })
      // push state to redux
      this.props.actions.loadCurrentTeachingCourse(this.state)
      this.props.actions.addFlashMessage({
        type: 'success',
        text: 'You have successfully created a Course!'
      })
      this.props.actions.push(
        `/my-courses/${this.state.courseId}/${this.state.courseName}/edit`
      )
    }
  }

  addTags = value => {
    this.setState({
      tags: value
    })
  }

  addTeachingLang = value => {
    this.setState({
      teachingLang: value
    })
  }

  addUsingLang = value => {
    this.setState({
      usingLang: value
    })
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    } else {
      return isValid
    }
  }

  render() {
    const courseNameFetchError = this.props.courseReducer.errorMsg
    const courseNameErrors = this.state.errors.courseName
    const courseDescriptionErrors = this.state.errors.courseDescription
    return (
      <Grid height="1400px">
        <StyledForm onSubmit={this.onSubmit}>
          <Title>Create a Course</Title>
          <Box margin="40px 0 0 0" position="relative">
            <Label>
              Course Name<StyledSpan display640="inline-block">
                {' '}
                (10-100 chars.)
              </StyledSpan>
            </Label>
            <DisplayCount>{this.state.courseName.length}</DisplayCount>
            <Input
              autoFocus
              className={
                courseNameErrors || courseNameFetchError ? 'courseError' : null
              }
              name="courseName"
              onChange={this.onChange}
              onBlur={this.onBlur}
              label="Course Name"
              minwidth="200px"
              placeholder="Give a unique name to your course."
              type="text"
              value={this.state.courseName}
              width="80%"
            />
            {this.state.errors.courseName &&
              Object.keys(courseNameErrors).map((key, i) => {
                return <Error key={i}>{courseNameErrors['message']}</Error>
              })}
            {this.props.courseReducer.loading ? (
              <Searching />
            ) : this.props.courseReducer.error ? (
              <p style={{color: 'red'}}>{this.props.courseReducer.errorMsg}</p>
            ) : (
              <p style={{color: 'green'}}>
                {this.props.courseReducer.courseNameMsg}
              </p>
            )}
          </Box>
          <Box margin="40px 0 0 0" position="relative">
            <Label>
              Course Description<StyledSpan display640="inline-block">
                {' '}
                (100-350 chars.)
              </StyledSpan>
            </Label>
            <DisplayCount>{this.state.courseDescription.length}</DisplayCount>
            <TextArea
              className={courseDescriptionErrors ? 'courseError' : null}
              name="courseDescription"
              onChange={this.onChange}
              label="Course Description"
              placeholder="Give a brief description about your course."
              height="200px"
              minwidth="200px"
              value={this.state.courseDescription}
              width="80%"
            />
            {this.state.errors.courseDescription &&
              Object.keys(courseDescriptionErrors).map((key, i) => {
                return (
                  <Error key={i}>{courseDescriptionErrors['message']}</Error>
                )
              })}
          </Box>
          <StyledGrid>
            <Flex
              gridarea="teaching"
              margin="40px 0 0 0"
              overflow="initial"
              position="relative">
              <Label>Teaching</Label>
              <Teaching addTeachingLang={this.addTeachingLang} />
            </Flex>
            <StyledFlex gridarea="using" margin1080="40px 0 0 0">
              <Label>Using</Label>
              <Using addUsingLang={this.addUsingLang} />
            </StyledFlex>
            <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
              <Label>Tags</Label>
              <Tags addTags={this.addTags} />
            </StyledFlex>
          </StyledGrid>
          <Box flexdirection="row">
            <StyledButton type="submit">Create Course</StyledButton>
          </Box>
        </StyledForm>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addFlashMessage,
        createCourse,
        resetCourseCreateForm,
        fetchCourseName,
        toggleFooter,
        push,
        loadCurrentTeachingCourse
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateCourse)
)
