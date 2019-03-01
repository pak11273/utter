import {Helmet} from "react-helmet"
import {compose, graphql} from "react-apollo"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
/* import TextField from "@material-ui/core/TextField" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import gql from "graphql-tag"

import {Field, withFormik} from "formik"
import isEmpty from "lodash/isEmpty"
import cloneDeep from "lodash/cloneDeep"
import Dropzone from "react-dropzone"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import axios from "axios"
import React, {Component} from "react"
import cuid from "cuid"
import styled from "styled-components"
import {courseCreateSchema} from "@utterzone/common"
import {history} from "@utterzone/connector"
import CryptoJS from "crypto-js"
import languageData from "../../../data/languageData.js"
import {Flex, FormikInput, FormikTextArea, Img, Span} from "../../../components"
import {addFlashMessage} from "../../../core/actions/flashMessages"
import {fetchCourseName} from "../actions.js"
import {toggleFooter} from "../../../core/actions/toggle-footer-action"
import CourseResources from "../components/course-resources"
import Teaching from "./teaching"
import Using from "./using"

const DisplayCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;
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
  resources: [],
  disabled: false,
  displayName: "",
  errors: {},
  levels: [{level: 1, cuid: cuid()}],
  loading: false,
  public_id: "",
  secure_url: "",
  signature: "",
  teachingLang: "",
  terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}],
  uploadedFile: {},
  url: "",
  usingLang: ""
}

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  heading: {
    color: "white"
  },
  heroUnit: {
    backgroundColor: "#2b59ae"
  },
  heroContent: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  root: {
    maxWidth: 960,
    margin: "0 auto"
  },
  subHeading: {
    color: "black",
    marginTop: "40px",
    position: "relative"
  }
})

const COURSE_CREATE = gql`
  mutation courseCreate(
    $courseName: String!
    $courseImage: String
    $courseDescription: String
    $courseMode: String
    $resources: [ResourceInput]
    $teachingLang: String
    $usingLang: String
  ) {
    courseCreate(
      input: {
        courseName: $courseName
        courseImage: $courseImage
        courseDescription: $courseDescription
        courseMode: $courseMode
        resources: $resources
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      id
      courseName
      owner {
        username
      }
      courseDescription
      courseMode
      resources {
        value
        label
      }
      teachingLang
      usingLang
    }
  }
`

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

  addResources = value => {
    this.setState({
      resources: value
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

    if (!isEmpty(files)) {
      this.setState({
        uploadedFile: files[0]
      })

      this.handleImageUpload(files)
    }
  }

  handleImageDelete = async state => {
    if (this.state.public_id) {
      const timestamp = await (Date.now() / 1000 || 0).toString()
      const apiSecret = "cWVpcWZDHFMA9H5Djue1uWHXcLo"
      const hashString = `public_id=${
        state.public_id
      }&timestamp=${timestamp}${apiSecret}`
      const signature = CryptoJS.SHA1(hashString).toString()
      axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/destroy/",
        data: {
          api_key: "225688292439754",
          public_id: state.public_id,
          resource_type: "image",
          signature,
          timestamp
        }
      })
        .then(res => {
          return res
        })
        .catch(err => {
          throw err.response.data.error
        })
    }
  }

  handleImageUpload(files) {
    // remove previous files from cdn
    if (!isEmpty(this.state.uploadedFile)) {
      console.log("file: ", this.state.uploadedFile)
      this.handleImageDelete(this.state)
    }

    var file = files[0]
    var formdata = new FormData()
    var cloud_name = "dgvw5b6pf"

    formdata.append("file", file)
    formdata.append("cloud_name", "dgvw5b6pf")
    formdata.append("upload_preset", "z28ks5gg")

    var xhr = new XMLHttpRequest()
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      true
    )

    xhr.onload = () => {
      // do something to response
      console.log(this.responseText)
    }
    xhr.send(formdata)

    /* // Push all the axios request promise into a single array */
    /* const uploaders = files.map(file => { */
    /*   // Initial FormData */
    /*   const formData = new FormData() */
    /*   formData.append("file", file) */
    /*   formData.append("tags", `course-name`) */
    /*   formData.append("upload_preset", "z28ks5gg") // Replace the preset name with your own */
    /*   formData.append("folder", "course-thumbnails") // Folder to place image in */
    /*   formData.append("api_key", "225688292439754") // Replace API key with your own Cloudinary key */
    /*   formData.append("timestamp", Date.now() / 1000 || 0) */

    /*   // set loading and disable submit */
    /*   const newState = update( */
    /*     this.state, */
    /*     { */
    /*       loading: {$set: true}, */
    /*       disable: {$set: true} */
    /*     }, */
    /*     () => console.log("state: ", this.state) */
    /*   ) */

    /*   this.setState(newState) */

    /*   // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) */
    /*   return axios({ */
    /*     method: "POST", */
    /*     url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/upload/", */
    /*     data: formData */
    /*   }) */
    /*     .then(res => { */
    /*       const {data} = res */
    /*       console.log("data: ", data) */

    /*       const newState = update(this.state, { */
    /*         public_id: {$set: data.public_id}, */
    /*         secure_url: {$set: data.secure_url}, */
    /*         signature: {$set: data.signature}, */
    /*         url: {$set: data.url} */
    /*       }) */

    /*       this.setState(newState) */

    /*       this.props.setFieldValue("courseImage", data.secure_url) */

    /*       return data */
    /*     }) */
    /*     .catch(err => { */
    /*       console.log("upload error: ", err) */
    /*     }) */
    /* }) */

    /* // Once all the files are uploaded */
    /* axios.all(uploaders).then(values => { */
    /*   /1* const {id} = this.props.course *1/ */
    /*   /1* const newCdn = {cdn: values[0]} *1/ */
    /*   const courseImage = values[0].secure_url */

    /*   const newState = update(this.state, { */
    /*     courseImage: {$set: courseImage}, */
    /*     loading: {$set: false}, */
    /*     disable: {$set: false} */
    /*   }) */

    /*   this.setState(newState) */
    /* }) */
  }

  render() {
    const {classes, handleSubmit} = this.props
    const {courseName, courseDescription} = this.props.values

    return (
      <React.Fragment>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
              name="description"
              content="Design your own course and help others learn the language you love!"
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Create a Course</title>
            <link rel="canonical" href="https://utterzone.com/course/create" />
          </Helmet>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Grid container justify="center" direction="column">
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.heading}
                  gutterBottom>
                  Create a Course
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.heading}
                  gutterBottom>
                  This is where you can build a course from current resources
                  like a school textbook or another language course. Other
                  people can subscribe to your course and practice speaking from
                  it!
                </Typography>
              </Grid>
            </div>
          </div>
          {/* End hero unit */}
          <main className={classes.content}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Course Name
                  <StyledSpan display640="inline-block">
                    {" "}
                    (10-100 chars.)
                  </StyledSpan>
                  <DisplayCount>{courseName.length}</DisplayCount>
                </Typography>
                <Field
                  fullWidth
                  id="outlined-search"
                  name="courseName"
                  label="Course Name"
                  type="text"
                  className={classes.searchField}
                  component={FormikInput}
                  margin="normal"
                  variant="outlined"
                  disabled={this.state.disabled}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Course Description
                  <StyledSpan display640="inline-block">
                    {" "}
                    (100-350 chars.)
                  </StyledSpan>
                  <DisplayCount>{courseDescription.length}</DisplayCount>
                </Typography>
                <Field
                  fullWidth
                  id="outlined-search"
                  name="courseDescription"
                  label="Course Description"
                  type="text"
                  className={classes.searchField}
                  component={FormikTextArea}
                  margin="normal"
                  variant="outlined"
                  disabled={this.state.disabled}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Using Language
                </Typography>
                <Field
                  name="usingLang"
                  component={Using}
                  addUsingLang={this.addUsingLang}
                  options={languageData}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Teaching Language
                </Typography>
                <Field
                  name="teachingLang"
                  component={Teaching}
                  addTeachingLang={this.addTeachingLang}
                  options={languageData}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Resources
                </Typography>
                <p>ie. Book, Classroom, Online Course</p>
                <CourseResources addResources={this.addResources} />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Course Thumbnail
                </Typography>
                <p>
                  Format: png or jpg, Dimensions: ~300pxx300px, Maximum size
                  limit: 500kb
                </p>
                <Grid item xs={12}>
                  <div style={{margin: "50px"}}>
                    {this.state.courseImage === "" ? (
                      <p>Thumbnail Preview</p>
                    ) : (
                      <Img
                        label="Course Thumbnail Preview"
                        name="image"
                        src={this.state.courseImage}
                        size="small"
                      />
                    )}
                  </div>
                  <Dropzone
                    style={{
                      margin: "50px",
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
                    <p>Drop an image or click to select a file to upload.</p>
                  </Dropzone>
                  <p>{this.state.uploadedFile.name}</p>
                </Grid>
                <Grid item style={{display: "flex", justifyContent: "center"}}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    size="large"
                    disabled={this.state.disabled}>
                    Create Course
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </form>
      </React.Fragment>
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
  compose(graphql(COURSE_CREATE, {name: "courseCreate"}))(
    withFormik({
      validationSchema: courseCreateSchema,
      validateOnChange: false,
      validateOnBlur: false,
      mapPropsToValues: () => ({
        courseName: "",
        courseImage:
          "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/course-thumbnails/fa-image_kzo6kn.jpg",
        courseDescription: "",
        courseMode: "draft",
        resources: [],
        teachingLang: "",
        usingLang: ""
      }),
      handleSubmit: async (values, {props, setErrors}) => {
        /* const result = await props.submit(values) */
        const result = await props.courseCreate({
          variables: {
            courseName: values.courseName,
            courseDescription: values.courseDescription,
            courseImage: values.courseImage,
            courseMode: values.courseMode,
            resources: values.resources,
            teachingLang: values.teachingLang,
            usingLang: values.usingLang
          }
        })

        const onComplete = result => {
          // TODO: push courseId to redux
          history.push({
            pathname: "/course/course-settings",
            state: {courseId: result.course.id}
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
          setErrors(result.COURSE_CREATE.errors)
          props.actions.addFlashMessage({
            type: "error",
            text: "Something went wrong. Could not create a course."
          })
        }
      }
    })(withStyles(styles)(CourseCreate))
  )
)
