import "../styles.css"
import {Button, Container, Form, Grid, Header} from "semantic-ui-react"
import {Field, withFormik} from "formik"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import React, {Component} from "react"
import cloneDeep from "lodash/cloneDeep"
import cuid from "cuid"
import styled, {ThemeProvider} from "styled-components"
import {courseCreateSchema} from "@utterzone/common"
import {
  Box,
  Flex,
  FormikInput,
  FormikTextArea,
  /* Input, */
  MastheadTitle,
  MastheadSubtitle,
  /* Searching, */
  Span
} from "../../../components"
import {Masthead} from "../../../containers"
import {addFlashMessage} from "../../../app/actions/flashMessages"
import {fetchCourseName} from "../actions"
import {main} from "../../../themes/config"
import {toggleFooter} from "../../../app/actions/toggleFooterAction"
import CourseRef from "../components/CourseRef"
import CourseTags from "../components/CourseTags"
import Teaching from "../containers/Teaching"
import Using from "../containers/Using"

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
const initialState = {
  cdn: {},
  charCount: 0,
  courseId: cuid(),
  courseAuthorId: "",
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

class CourseCreate extends Component {
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

  render() {
    const {handleSubmit} = this.props
    const {courseName, courseDescription} = this.props.values

    return (
      <ThemeProvider theme={main}>
        <Grid>
          <Grid.Row centered>
            <Masthead background="#000 url(http://www.focusondrives.com/wp-content/uploads/Danfoss-application-software-development-2-1024x657.jpg) no-repeat left top">
              <MastheadTitle color="#F6D155">Create a Course</MastheadTitle>
              <MastheadSubtitle color="#F6D155">
                Use material from current resources you are learning from or
                formulate your own teaching strategy!
              </MastheadSubtitle>
            </Masthead>
          </Grid.Row>
          <Grid.Row centered>
            <Container>
              <Grid.Column textAlign="center">
                <StyledForm error onSubmit={handleSubmit}>
                  <Box margin="40px 0 0 0" position="relative">
                    <Header>
                      Course Name
                      <StyledSpan display640="inline-block">
                        {" "}
                        (10-100 chars.)
                      </StyledSpan>
                    </Header>
                    <DisplayCount>{courseName.length}</DisplayCount>
                    <Field
                      name="courseName"
                      placeholder="Provide a unique name for your course."
                      component={FormikInput}
                      style={{width: "300px"}}
                    />
                  </Box>
                  <Box margin="40px 0 0 0" position="relative">
                    <Header>
                      Course Description
                      <StyledSpan display640="inline-block">
                        {" "}
                        (10-100 chars.)
                      </StyledSpan>
                    </Header>
                    <DisplayCount>{courseDescription.length}</DisplayCount>
                    <Field
                      name="courseDescription"
                      placeholder="Provide a brief description of your course."
                      component={FormikTextArea}
                      style={{width: "500px"}}
                    />
                  </Box>
                  <Grid>
                    <Flex
                      gridarea="teaching"
                      margin="40px 0 0 0"
                      overflow="initial"
                      position="relative">
                      <Header>Teaching</Header>
                      <Teaching addTeachingLang={this.addTeachingLang} />
                    </Flex>
                    <StyledFlex gridarea="using" margin1080="40px 0 0 0">
                      <Header>Using</Header>
                      <Using addUsingLang={this.addUsingLang} />
                    </StyledFlex>
                    <StyledFlex gridarea="ref" margin1080="40px 0 0 0">
                      <Header>Course Reference</Header>
                      <p>ie. Book, Classroom, Online Course</p>
                      <CourseRef addRef={this.addRef} />
                    </StyledFlex>
                    <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
                      <Header>Tags</Header>
                      <CourseTags addTags={this.addTags} />
                    </StyledFlex>
                    <StyledFlex gridarea="tags" margin1080="40px 0 0 0">
                      <Button type="submit" color="yellow">
                        Create Course
                      </Button>
                    </StyledFlex>
                  </Grid>
                </StyledForm>
              </Grid.Column>
            </Container>
          </Grid.Row>
        </Grid>
      </ThemeProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage,
      fetchCourseName,
      toggleFooter,
      push
    },
    dispatch
  )
})

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: courseCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      courseName: "",
      courseDescription: "",
      courseMode: "draft"
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.submit(values)
      const onComplete = () => {
        history.push("/", {
          announcement: "You can start building your course."
        })
      }

      // if create is legit
      console.log("res: ", result)
      if (typeof result === "string") {
        onComplete()
        props.actions.addFlashMessage({
          type: "success",
          text: "Welcome to Utterzone"
        })
      } else {
        /* setErrors(result) */
        // TODO test for auth
        setErrors({test: "test"})
        props.actions.addFlashMessage({
          type: "error",
          text: "Something went wrong. Could not create a course."
        })
      }
    }
  })(CourseCreate)
)
