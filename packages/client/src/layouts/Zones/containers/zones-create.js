import React, {Component} from "react"
import {Helmet} from "react-helmet"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

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
import Apps from "./apps"
import appData from "../../../data/appData.js"
import {history} from "@utterzone/connector"
import {Flex, FormikInput, FormikTextArea, Span} from "../../../components"
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
  disabled: false,
  displayName: "",
  errors: {},
  app: "Total Recall",
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

class ZoneCreate extends Component {
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

  addAge = value => {
    this.setState({
      ageGroup: value
    })
  }

  onBlur = () => {
    this.props.actions.fetchZoneName(this.state.zoneName)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addCourse = value => {
    this.setState({
      course: value
    })
  }

  addApp = value => {
    this.setState({
      app: value
    })
  }

  addLevel = value => {
    this.setState({
      courseLevel: value
    })
  }

  addRef = value => {
    this.setState({
      zoneRef: value
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
                    (10-30 chars.)
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
                  disabled={this.state.disabled}
                />
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Zone Description
                  <StyledSpan display640="inline-block">
                    {" "}
                    (100-350 chars.)
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
                  disabled={this.state.disabled}
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
                  component={Apps}
                  addApp={this.addApp}
                  options={appData}
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
                  component="select"
                  onClick={this.addCourse}>
                  <option>first</option>
                  <option>second</option>
                  <option>third</option>
                </Field>
                <Typography
                  align="left"
                  variant="h6"
                  className={classes.subHeading}
                  gutterBottom>
                  Set Levels
                </Typography>
                <p>The minimum level a user has to be to enter this zone.</p>
                <Field
                  name="courseLevel"
                  component="select"
                  onClick={this.addLevel}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Field>
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
                  or vulgar behaviour.
                </p>
                <Field name="ageGroup" component="select" onClick={this.addAge}>
                  <option>any age</option>
                  <option>ages 0-2</option>
                  <option>ages 3+</option>
                  <option>ages 7+</option>
                  <option>ages 12+</option>
                  <option>ages 16+</option>
                  <option>ages 18+</option>
                  <option>ages 18+</option>
                  <option>ages 30+</option>
                  <option>ages 40+</option>
                  <option>ages 50+</option>
                  <option>ages 60+</option>
                </Field>
              </Grid>
              <Grid item style={{display: "flex", justifyContent: "center"}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.onButtonClick}
                  size="large"
                  disabled={this.state.disabled}>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage,
      toggleFooter
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: zoneCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: props => ({
      ageGroup: "",
      app: "",
      appLevel: 1,
      owner: props.user.id,
      zoneName: "",
      zoneImage:
        "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk",
      zoneDescription: "",
      course: "",
      courseLevel: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.submit(values)
      const chatHistory = []
      const onComplete = result => {
        history.push({
          pathname: `/zone/${result.zoneCreate.id}`,
          state: {chatHistory, zoneId: result.zoneCreate.id}
        })
      }

      // if create is legit
      if (result) {
        onComplete(result)
        props.actions.addFlashMessage({
          type: "success",
          text: "Zone successfully created!"
        })
      } else {
        setErrors(result.zoneCreate.errors)
        props.actions.addFlashMessage({
          type: "error",
          text: "Something went wrong. Could not create a zone."
        })
      }
    }
  })(withStyles(styles)(ZoneCreate))
)
/* <TextField
                fullWidth
                name="owner"
                component={FormikInput}
                value={this.props.user.id}
                id="outlined-search"
                label="Zone Name"
                onChange={this.handleChange}
                type="text"
                className={classes.searchField}
                margin="normal"
                variant="outlined"
              />
*/
