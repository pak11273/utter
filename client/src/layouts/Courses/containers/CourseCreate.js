import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {push} from "react-router-redux"
import {connect} from "react-redux"
import cloneDeep from "lodash/cloneDeep"
import styled from "styled-components"
import update from "immutability-helper"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"

import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail
} from "../errorMessages"

import {registerPasswordValidation} from "../yupSchemas"
import {validateInput} from "../../../utils/validations/courseCreate.js"
import {addFlashMessage} from "../../../app/actions/flashMessages.js"
import validator from "validator"
import cuid from "cuid"
import Teaching from "./Teaching.js"
import Using from "./Using.js"
import "../styles.css"

import CourseRef from "../components/CourseRef.js"

import {
  Box,
  Button,
  Flex,
  Input,
  Label,
  Searching,
  Span,
  Tags,
  Text,
  TextArea
} from "../../../components"

import {Layout} from "antd/lib"
const {Content, Footer} = Layout
import {Grid, Header} from "semantic-ui-react"
// images
import transLoader from "../../../assets/images/trans_loader.gif"

// actions
import {toggleFooter} from "../../../app/actions/toggleFooterAction.js"
import {fetchCourseName} from "../actions.js"

import course from "../../../api/course/actions/courseActions.js"

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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: registerPasswordValidation
})

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

  onBlur = e => {
    this.props.actions.fetchCourseName(this.state.courseName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.isValid()) {
      this.props.actions.createTeachingCourse(this.state)

      this.props.actions.addFlashMessage({
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
    const courseNameFetchError = this.props.courseReducer.errorMsg
    const courseNameErrors = this.state.errors.courseName
    const courseDescriptionErrors = this.state.errors.courseDescription
    console.log("props: ", this.props)
    return (
      <Layout>
        <Content>hi</Content>
        <Grid columns={1}>
          <Grid.Column textAlign="center">
            <Header as="h1">Create a Course</Header>
            <Formik
              validationSchema={validationSchema}
              initialValues={{email: "", password: ""}}
              validate={values => {
                let errors = {}
                if (!values.email) {
                  errors.email = "Required"
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address"
                }
                return errors
              }}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  setSubmitting(false)
                }, 400)
              }}>
              {({isSubmitting}) => (
                <Form>
                  <Box margin="40px 0 0 0" position="relative">
                    <Header>
                      Course Name
                      <StyledSpan display640="inline-block">
                        {" "}
                        (10-100 chars.)
                      </StyledSpan>
                    </Header>
                    <DisplayCount>{this.state.courseName.length}</DisplayCount>
                    <Input
                      autoFocus
                      className={
                        courseNameErrors || courseNameFetchError
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
                      value={this.state.courseName}
                      width="80%"
                    />
                    {this.state.errors.courseName &&
                      Object.keys(courseNameErrors).map((key, i) => {
                        return (
                          <Error key={i}>{courseNameErrors["message"]}</Error>
                        )
                      })}
                    {this.props.courseReducer.loading ? (
                      <Searching />
                    ) : this.props.courseReducer.error ? (
                      <p style={{color: "red"}}>
                        {this.props.courseReducer.errorMsg}
                      </p>
                    ) : (
                      <p style={{color: "green"}}>
                        {this.props.courseReducer.courseNameMsg}
                      </p>
                    )}
                  </Box>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                  <Box flexdirection="row">
                    <StyledButton type="submit" disabled={isSubmitting}>
                      Create Course
                    </StyledButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid.Column>
        </Grid>
      </Layout>
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
        addFlashMessage,
        createTeachingCourse: course.create,
        fetchCourseName,
        toggleFooter,
        push
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateCourse)
)

{
  /*
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
              <DisplayCount>{this.state.courseName.length}</DisplayCount>
              <Input
                autoFocus
                className={
                  courseNameErrors || courseNameFetchError
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
                value={this.state.courseName}
                width="80%"
              />
              {this.state.errors.courseName &&
                Object.keys(courseNameErrors).map((key, i) => {
                  return <Error key={i}>{courseNameErrors["message"]}</Error>
                })}
              {this.props.courseReducer.loading ? (
                <Searching />
              ) : this.props.courseReducer.error ? (
                <p style={{color: "red"}}>
                  {this.props.courseReducer.errorMsg}
                </p>
              ) : (
                <p style={{color: "green"}}>
                  {this.props.courseReducer.courseNameMsg}
                </p>
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
              <DisplayCount>{this.state.courseDescription.length}</DisplayCount>
              <TextArea
                className={courseDescriptionErrors ? "courseError" : null}
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
                    <Error key={i}>{courseDescriptionErrors["message"]}</Error>
                  )
                })}
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
            </Grid>
          </StyledForm>
        </Grid.Column>
      </Grid> */
}
