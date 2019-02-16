import React, {Component} from "react"
import {Helmet} from "react-helmet"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
/* import TextField from "@material-ui/core/TextField" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Field, withFormik} from "formik"
/* import update from "immutability-helper" */
import schema from "../../../core/schema.js"
import cloneDeep from "lodash/cloneDeep"
import cuid from "cuid"
import styled from "styled-components"
import {zoneCreateSchema} from "@utterzone/common"
import appData from "../../../data/appData.js"
import {history} from "@utterzone/connector"
import {
  Flex,
  FormikInput,
  FormikSelect,
  FormikTextArea,
  Span
} from "../../../components"

// actions
import {loadData} from "../../../api/actions.js"
import {addFlashMessage} from "../../../core/actions/flashMessages"
import {toggleFooter} from "../../../core/actions/toggle-footer-action"

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
  ageGroup: "Any age",
  cdn: {},
  charCount: 0,
  course: "",
  zoneId: cuid(),
  zoneImage: "",
  zoneRef: "",
  displayName: "",
  errors: {},
  levels: [{level: 1, cuid: cuid()}],
  appLevel: "",
  loading: false,
  owner: "",
  public_id: "",
  secure_url: "",
  signature: "",
  terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}],
  url: ""
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
    backgroundColor: "#502bae"
  },
  heroContent: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 6}px`
  },
  root: {
    maxWidth: 960,
    margin: "0 auto"
  },
  saveButton: {
    margin: "50px"
  },
  subHeading: {
    color: "black",
    marginTop: "40px",
    position: "relative"
  }
})

class ZoneCreate extends Component {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    this.props.toggleFooter(false)

    // clear state
    this.setState(initialState)
  }

  componentWillUnmount() {
    this.props.toggleFooter(true)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {classes, handleSubmit} = this.props
    const {zoneName, zoneDescription} = this.props.values

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
              content="Create a zone and practice speaking a new language!"
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Create a Zone</title>
            <link rel="canonical" href="https://utterzone.com/zone/create" />
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
                  Host a Zone
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  className={classes.heading}
                  gutterBottom>
                  Create a zone where you and others can practice speaking on
                  focused subjects that will help build your level of fluency in
                  speaking your new language.
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
                  Zone Name
                  <StyledSpan display640="inline-block">
                    (3-40 chars.)
                  </StyledSpan>
                  <DisplayCount>{zoneName.length}</DisplayCount>
                </Typography>
                <Field
                  fullWidth
                  id="outlined-search"
                  name="zoneName"
                  label="Zone Name"
                  type="text"
                  className={classes.searchField}
                  component={FormikInput}
                  margin="normal"
                  variant="outlined"
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Zone Description
                  <StyledSpan display640="inline-block">
                    {" "}
                    (30-110 chars.)
                  </StyledSpan>
                  <DisplayCount>{zoneDescription.length}</DisplayCount>
                </Typography>
                <Field
                  fullWidth
                  id="outlined-search"
                  name="zoneDescription"
                  label="Zone Description"
                  type="text"
                  className={classes.searchField}
                  component={FormikTextArea}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Apps
                </Typography>
                <Field
                  name="app"
                  type="text"
                  options={appData}
                  component={FormikSelect}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Subscribed Courses
                </Typography>
                <Field
                  name="course"
                  type="text"
                  component={FormikSelect}
                  options={[
                    {
                      value: "label 1",
                      label: "label 1",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: "label 2",
                      label: "label 2",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: "label 3",
                      label: "label 3",
                      className: "courseHeader",
                      disabled: false
                    }
                  ]}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Set Levels
                </Typography>
                <p>Apps will use the course information from this level.</p>
                <Field
                  name="courseLevel"
                  type="text"
                  component={FormikSelect}
                  options={[
                    {
                      value: "some course 1",
                      label: "1",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: "some course 2",
                      label: "2",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: "some course 3",
                      label: "3",
                      className: "courseHeader",
                      disabled: false
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Age Restrictions
                </Typography>
                <p>
                  Pick an appropriate age setting or a specific age demographic.
                  Conversations are still not to involve any sexual misconduct
                  or vulgar behaviour. Account bans/suspensions are duly
                  enforced.
                </p>
                <Field
                  name="ageGroup"
                  type="text"
                  component={FormikSelect}
                  options={[
                    {
                      value: "any age",
                      label: "any age",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 0-2",
                      label: "ages 0-2",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 3+",
                      label: "ages 3+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 7+",
                      label: "ages 7+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 12+",
                      label: "ages 12+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 16+",
                      label: "ages 16+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 18+",
                      label: "ages 18+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 18+",
                      label: "ages 18+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 30+",
                      label: "ages 30+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 40+",
                      label: "ages 40+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 50+",
                      label: "ages 50+",
                      className: "ageHeader",
                      disabled: false
                    },
                    {
                      value: "ages 60+",
                      label: "ages 60+",
                      className: "ageHeader",
                      disabled: false
                    }
                  ]}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.saveButton}
                  type="submit"
                  onClick={this.onButtonClick}
                  size="large">
                  Create Zone
                </Button>
              </Grid>
            </Grid>
          </main>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User} = session
  const userObj = User.all().toRefArray()
  var user = userObj[0]
  return {
    user
  }
}

export default connect(
  mapStateToProps,
  {
    addFlashMessage,
    loadData,
    toggleFooter
  }
)(
  withFormik({
    validationSchema: zoneCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: props => ({
      ageGroup: "",
      app: "",
      appLevel: 1,
      course: "",
      courseLevel: "",
      owner: props.user.id,
      resources: "",
      zoneName: "",
      zoneImage:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk",
      zoneDescription: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.submit(values)
      const chatHistory = []
      const onComplete = result => {
        history.push({
          pathname: `/zone/${result.zoneCreate.id}`,
          state: {chatHistory, zoneId: result.zoneCreate.id}
        })
        console.log("result: ", result.zoneCreate)
        props.loadData({zone: result.zoneCreate})
      }

      // if create is legit
      if (result) {
        onComplete(result)
        props.addFlashMessage({
          type: "success",
          text: "Zone successfully created!"
        })
      } else {
        setErrors(result.zoneCreate.errors)
        props.addFlashMessage({
          type: "error",
          text: "Could not create a zone. Please contact technical support."
        })
      }
    }
  })(withStyles(styles)(ZoneCreate))
)
