import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {push} from "react-router-redux"
import {connect} from "react-redux"
import cloneDeep from "lodash/cloneDeep"
import styled from "styled-components"
import {Form} from "formik"
import cuid from "cuid"
import {Button, Grid, Header} from "semantic-ui-react"
import PropTypes from "prop-types"

import {validateInput} from "../../../utils/validations/courseCreate"
import {addFlashMessage} from "../../../app/actions/flashMessages"
import Teaching from "./Teaching"
import Using from "./Using"
import "../styles.css"

import CourseRef from "../components/CourseRef"

import {
  Box,
  Flex,
  Input,
  Label,
  Searching,
  Span,
  Tags,
  TextArea
} from "../../../components"

// images
/* import transLoader from "../../../assets/images/trans_loader.gif" */

// actions
import {toggleFooter} from "../../../app/actions/toggleFooterAction"
import {fetchCourseName} from "../actions"

import course from "../../../api/course/actions/courseActions"

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
  height: 1000px;
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
  margin: "80px 0 0 0"
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
const initialState = {
  cdn: {},
  charCount: 0,
  courseId: cuid(),
  courseAuthorId: "",
  courseDescription: "",
  courseName: "",
  levels: [{level: 1, cuid: cuid()}],
  terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}],
  displayName: "",
  errors: {},
  loading: false,
  courseRef: "",
  tags: [],
  teachingLang: "",
  usingLang: ""
}

class CreateCourse extends Component {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)

    // clear state
    this.setState(initialState)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onBlur = () => {
    this.props.actions.fetchCourseName(this.state.courseName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const {actions} = this.props
    if (this.isValid()) {
      actions.createTeachingCourse(this.state)

      actions.addFlashMessage({
        type: "success",
        text: "You have successfully created a Course!"
      })
    }
  }

  addRef = value => {
    this.setState({
      courseRef: value
    })
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
    const {courseReducer} = this.props
    const {
      courseName,
      courseNameErrors,
      courseDescription,
      courseDescriptionErrors,
      errors
    } = this.state
    return (
      <Grid columns={1}>
        <Grid.Column textAlign="center">
          <StyledForm onSubmit={this.onSubmit}>
            <Header as="h1">Create a Course</Header>
            <Box margin="40px 0 0 0" position="relative">
              <Header>
                Course Name
                <StyledSpan display640="inline-block">
                  {" "}
                  (10-100 chars.)
                </StyledSpan>
              </Header>
              <DisplayCount>{courseName.length}</DisplayCount>
              <Input
                autoFocus
                className={
                  courseNameErrors || courseReducer.errorMsg
                    ? "courseError"
                    : null
                }
                name="courseName"
                onChange={this.onChange}
                onBlur={this.onBlur}
                label="Course Name"
                minwidth="200px"
                placeholder="Give a unique name to your course."
                type="text"
                value={courseName}
                width="80%"
              />
              {errors.courseName &&
                Object.keys(courseNameErrors).map((key, i) => (
                  <Error key={i}>{courseNameErrors.message}</Error>
                ))}
              {courseReducer.loading ? (
                <Searching />
              ) : courseReducer.error ? (
                <p style={{color: "red"}}>{courseReducer.errorMsg}</p>
              ) : (
                <p style={{color: "green"}}>{courseReducer.courseNameMsg}</p>
              )}
            </Box>
            <Box margin="40px 0 0 0" position="relative">
              <Label>
                Course Description
                <StyledSpan display640="inline-block">
                  {" "}
                  (100-350 chars.)
                </StyledSpan>
              </Label>
              <DisplayCount>{courseDescription.length}</DisplayCount>
              <TextArea
                className={courseDescriptionErrors ? "courseError" : null}
                name="courseDescription"
                onChange={this.onChange}
                label="Course Description"
                placeholder="Give a brief description about your course."
                height="200px"
                minwidth="200px"
                value={courseDescription}
                width="80%"
              />
              {errors.courseDescription &&
                Object.keys(courseDescriptionErrors).map((key, i) => (
                  <Error key={i}>{courseDescriptionErrors.message}</Error>
                ))}
            </Box>
            <Grid>
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
              <StyledFlex gridarea="ref" margin1080="40px 0 0 0">
                <Label>Course Reference</Label>
                <p>ie. Book, Classroom, Online Course</p>
                <CourseRef addRef={this.addRef} />
              </StyledFlex>
              <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
                <Label>Tags</Label>
                <Tags addTags={this.addTags} />
              </StyledFlex>
              <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
                <Button>Create Course</Button>
              </StyledFlex>
            </Grid>
          </StyledForm>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  courseReducer: state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage,
      createTeachingCourse: course.create,
      fetchCourseName,
      toggleFooter,
      push
    },
    dispatch
  )
})

CreateCourse.propTypes = {
  actions: PropTypes.func
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateCourse)
)
