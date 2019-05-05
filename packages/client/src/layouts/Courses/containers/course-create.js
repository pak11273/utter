/* eslint-disable */
import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {Helmet} from "react-helmet-async"
import {compose, graphql} from "react-apollo"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import gql from "graphql-tag"
import {session} from "brownies"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
import isEmpty from "lodash/isEmpty"
import cloneDeep from "lodash/cloneDeep"
import Dropzone from "react-dropzone"
import cuid from "cuid"
import styled from "styled-components"
/* import {courseCreateSchema} from "@utterzone/common" */
import {courseCreateSchema} from "../yupSchemas.js"
import CryptoJS from "crypto-js"
import {groupedOptions} from "../../../data/language-data.js"
import {
  FormikInput,
  FormikTextArea,
  Span,
  Img,
  LoadingButton,
  Teaching,
  Using
} from "../../../components"

import {handleCloudinaryUpload} from "../../../utils/cloudinary-utils.js"

const DisplayCount = styled.div`
  font-size: 0.8rem;
  position: absolute;
  right: 2%;
  top: 6px;
`
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
  resource: "",
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

const COURSE_CREATE_MUTATION = gql`
  mutation courseCreate(
    $title: String!
    $courseImage: String
    $courseDescription: String
    $courseMode: String
    $resource: String
    $teachingLang: String
    $usingLang: String
  ) {
    courseCreate(
      input: {
        title: $title
        courseImage: $courseImage
        courseDescription: $courseDescription
        courseMode: $courseMode
        resource: $resource
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      _id
      courseDescription
      courseImage
      courseMode
      title
      owner {
        username
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
    // clear state
    this.setState(initialState)
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.uploadedFilePreview)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
      this.setState(
        {
          uploadedFile: files[0],
          uploadedFilePreview: URL.createObjectURL(files[0])
        },
        () =>
          this.props.setValues({
            ...this.props.values,
            uploadedFile: files[0]
          })
      )
    }
  }

  handleImageDelete = async state => {
    if (this.state.public_id) {
      const timestamp = await (Date.now() / 1000 || 0).toString()
      const apiSecret = process.env.CLOUDINARY_API_SECRET
      const hashString = `public_id=${
        state.public_id
      }&timestamp=${timestamp}${apiSecret}`
      const signature = CryptoJS.SHA1(hashString).toString()

      var formdata = new FormData()

      formdata.append("api_key", process.env.CLOUDINARY_API_KEY)
      formdata.append("public_id", state.public_id)
      formdata.append("resource_type", "image")
      formdata.append("signature", signature)
      formdata.append("timestamp", timestamp)

      var xhr = new XMLHttpRequest()

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${
          process.env.CLOUDINARY_CLOUD_NAME
        }/image/destroy`,
        true
      )

      xhr.send(formdata)
    }
  }

  render() {
    const {
      classes,
      errors,
      handleSubmit,
      isSubmitting,
      setFieldTouched,
      setFieldValue,
      touched,
      values
    } = this.props
    const {title, courseDescription, usingLang} = this.props.values
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
          {/*   Hero unit */}
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
                  This is where you can build a course from current resource
                  like a school textbook or another language course. Other
                  people can subscribe to your course and practice speaking from
                  it!
                </Typography>
              </Grid>
            </div>
          </div>
          {/*     End hero unit  */}
          <main className={classes.content}>
            <Grid container spacing={24}>
              <Grid item>
                <Typography align="left" variant="h6" gutterBottom>
                  Course Thumbnail
                </Typography>
                <Typography align="left" variant="body1" gutterBottom>
                  Format: png or jpg, Dimensions: ~300px by 300px, Maximum size
                  limit: 500kb
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{margin: "50px", textAlign: "center"}}>
                  {!this.state.uploadedFilePreview ? (
                    <p>Thumbnail Preview</p>
                  ) : (
                    <Img
                      alt="thumbnail"
                      label="Course Thumbnail Preview"
                      name="image"
                      src={this.state.uploadedFilePreview}
                      size="small"
                    />
                  )}
                  <p>{this.state.uploadedFile.name}</p>
                  {!this.state.disabled && <div />}
                  <Dropzone
                    maxSize={500000}
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div
                          style={{
                            margin: "50px auto",
                            padding: "3px",
                            position: "relative",
                            width: "200px",
                            height: "100px",
                            borderWidth: "2px",
                            borderColor: "rgb(102, 102, 102)",
                            borderStyle: "dashed",
                            borderRadius: "5px",
                            alignItems: "center",
                            display: "flex"
                          }}
                          {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Drop an image or click to select a file to upload.
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>{" "}
                </div>
              </Grid>
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
                  <DisplayCount>{title.length}</DisplayCount>
                </Typography>
                <Field
                  fullWidth
                  id="outlined-search"
                  name="title"
                  label="Course Title"
                  type="text"
                  component={FormikInput}
                  margin="normal"
                  required
                  variant="outlined"
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
                  component={FormikTextArea}
                  margin="normal"
                  required
                  variant="outlined"
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
                  error={errors.usingLang}
                  component={Using}
                  addUsingLang={this.addUsingLang}
                  options={groupedOptions}
                  onChange={setFieldValue}
                  touched={touched.usingLang}
                  value={values.usingLang}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Teaching Language
                </Typography>
                <Field
                  error={errors.teachingLang}
                  name="teachingLang"
                  component={Teaching}
                  addTeachingLang={this.addTeachingLang}
                  onChange={setFieldValue}
                  options={groupedOptions}
                  touched={touched.usingLang}
                  value={values.teachingLang}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Resource
                </Typography>
                <p>ie. Book, Classroom, Online Course</p>
                <Field
                  id="resource"
                  label="Resource"
                  type="text"
                  name="resource"
                  component={FormikInput}
                />
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "60px"
                  }}>
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    loading={isSubmitting}
                    disabled={isSubmitting}>
                    Create Course
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </form>
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(COURSE_CREATE_MUTATION, {name: "courseCreate"}),
  withRouter,
  withFormik({
    validationSchema: courseCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      title: "",
      courseImage:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/course-thumbnails/fa-image_kzo6kn.jpg",
      courseDescription: "",
      courseMode: "draft",
      resource: "",
      teachingLang: "",
      topics: [],
      usingLang: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const cdnUpload = await handleCloudinaryUpload(
        values.uploadedFile,
        "image",
        "course-thumbnails"
      )

      const merge = cdnUpload => {
        return {...values, secure_url: cdnUpload.secure_url}
      }

      const result = merge(cdnUpload)
      const course = await props.courseCreate({
        variables: {
          title: result.title,
          courseDescription: result.courseDescription,
          courseImage: result.secure_url,
          courseMode: result.courseMode,
          resource: result.resource,
          teachingLang: result.teachingLang,
          usingLang: result.usingLang
        }
      })

      const onComplete = course => {
        session.level = ""
        session.course = course.data.courseCreate
        props.history.push({
          pathname: "/course/course-introduction",
          state: {courseId: course.data.courseCreate._id}
        })
      }

      // if create is legit
      if (course) {
        onComplete(course)
        toast.success("Start building your course.", {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      } else {
        setErrors(course.COURSE_CREATE_MUTATION.errors)
        toast.error("Something went wrong. Could not create a course.", {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      }
    }
  }),
  withStyles(styles)
)(CourseCreate)
