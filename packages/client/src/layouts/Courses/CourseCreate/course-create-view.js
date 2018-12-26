import "../styles.css"
import {Button, Container, Form, Grid, Header, Image} from "semantic-ui-react"
import {Field, withFormik} from "formik"
import isEmpty from "lodash/isEmpty"
import Dropzone from "react-dropzone"
import {bindActionCreators} from "redux"
import update from "immutability-helper"
import {connect} from "react-redux"
import axios from "axios"
import React, {Component} from "react"
import cloneDeep from "lodash/cloneDeep"
import cuid from "cuid"
import styled, {ThemeProvider} from "styled-components"
import {courseCreateSchema} from "@utterzone/common"
import {history} from "@utterzone/connector"
import languageData from "../../../data/languageData.js"
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
  courseImage: "",
  levels: [{level: 1, cuid: cuid()}],
  terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}],
  displayName: "",
  errors: {},
  loading: false,
  courseRef: "",
  tags: [],
  secure_url: "",
  teachingLang: "",
  usingLang: "",
  uploadedFile: {}
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

  onImageDrop = (files, rejected) => {
    if (!isEmpty(rejected)) {
      alert("Please decrease the image size to less than 500kb.")
    }
    console.log("files; ", files)

    if (!isEmpty(files)) {
      this.setState({
        uploadedFile: files[0]
      })

      this.handleImageUpload(files)
    }
  }

  handleImageUpload(files) {
    // this.handleImageDelete() // TODO
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append("file", file)
      formData.append("tags", `course-name`)
      formData.append("upload_preset", "z28ks5gg") // Replace the preset name with your own
      formData.append("folder", "course-thumbnails") // Folder to place image in
      formData.append("api_key", "225688292439754") // Replace API key with your own Cloudinary key
      formData.append("timestamp", Date.now() / 1000 || 0)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/upload/",
        data: formData
      })
        .then(res => {
          const {data} = res
          console.log("axios: ", this)
          this.props.setFieldValue("courseImage", this.state.courseImage)

          return data
        })
        .catch(err => {
          console.log("upload error: ", err)
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(values => {
      /* const {id} = this.props.course */
      /* const newCdn = {cdn: values[0]} */
      const courseImage = values[0].secure_url

      const newState = update(this.state, {
        courseImage: {$set: courseImage}
      })

      this.setState(newState)

      /* this.setState({}) */

      // TODO: update Course on server
      /* this.props.updateSettings(this.props.course) */
    })
  }

  handleImageDelete() {
    const timestamp = Date.now() / 1000 || 0
    axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/q2vo0abd/image/destroy/",
      data: {
        api_key: "225688292439754",
        file: this.props.course.cdn.file,
        public_id: this.props.course.cdn.public_id,
        resource_type: "image",
        signature: this.props.course.cdn.signature,
        timestamp
        // upload_preset: 'z28ks5gg',
        // folder: 'course-thumbnails',
      }
    })
      .then(res => {
        return res
      })
      .catch(err => {
        throw err.response.data.error
      })
  }

  render() {
    const {handleSubmit} = this.props
    console.log("view: ", this.props)
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
                      <Field
                        name="teachingLang"
                        component={Teaching}
                        addTeachingLang={this.addTeachingLang}
                        options={languageData}
                      />
                      {/* <Teaching addTeachingLang={this.addTeachingLang} /> */}
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
                      <Header>Course Thumbnail</Header>
                      <p>
                        Format: png or jpg, Dimensions: ~300pxx300px, Maximum
                        size limit: 500kb
                      </p>
                      <div style={{margin: "50px"}}>
                        {this.state.courseImage === "" ? (
                          <p>Thumbnail Preview</p>
                        ) : (
                          <Form.Field
                            label="Course Thumbnail Preview"
                            name="image"
                            control={Image}
                            src={this.state.courseImage}
                            size="small"
                          />
                        )}
                      </div>
                      <Dropzone
                        style={{
                          padding: "3px",
                          position: "relative",
                          width: "200px",
                          height: "100px",
                          borderWidth: "2px",
                          borderColor: "rgb(102, 102, 102)",
                          borderStyle: "dashed",
                          borderRadius: "5px"
                        }}
                        maxSize={500000}
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop}>
                        <p>
                          Drop an image or click to select a file to upload.
                        </p>
                      </Dropzone>
                      <p>{this.state.uploadedFile.name}</p>
                    </StyledFlex>
                    <StyledFlex margin1080="40px 0 0 0">
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
      toggleFooter
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
      courseImage: "",
      courseDescription: "",
      courseMode: "draft",
      teachingLang: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.submit(values)
      const onComplete = result => {
        // TODO: push courseId to redux
        history.push({
          pathname: "/course/course-settings",
          state: {courseId: result.courseCreate.id}
        })
      }

      // if create is legit
      if (result) {
        onComplete(result)
        props.actions.addFlashMessage({
          type: "success",
          text: "Start building your course."
        })
      } else {
        setErrors(result.courseCreate.errors)
        props.actions.addFlashMessage({
          type: "error",
          text: "Something went wrong. Could not create a course."
        })
      }
    }
  })(CourseCreate)
)
