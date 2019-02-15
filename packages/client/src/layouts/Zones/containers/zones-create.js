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
import {Box, Flex, FormikInput, FormikTextArea, Span} from "../../../components"
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
  heroUnit: {
    backgroundColor: "#502bae"
  },
  heroContent: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 2}px ${theme
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
    height: "400px"
  },
  text: {
    color: "white"
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
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Make direct contact with our team through our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Grid container justify="center" direction="column">
              <Typography
                align="center"
                variant="h4"
                className={classes.text}
                gutterBottom>
                Host a Zone
              </Typography>
              <Typography
                align="center"
                variant="h6"
                className={classes.text}
                gutterBottom>
                Create a zone where you and others can practice speaking on
                focused subjects that will help build your level of fluency in
                speaking your new language.
              </Typography>
            </Grid>
          </div>
        </div>
        <main className={classes.content}>
          <form onSubmit={handleSubmit}>
            <Grid>
              <Typography
                variant="h4"
                align="left"
                className={classes.text}
                gutterBottom>
                Zone Name
              </Typography>
              <StyledSpan display640="inline-block">(10-100 chars.)</StyledSpan>
              <DisplayCount>{zoneName.length}</DisplayCount>
              <Field
                name="zoneName"
                placeholder="Provide a unique name for your zone."
                component={FormikInput}
                style={{width: "300px"}}
              />
            </Grid>
            <Box margin="40px 0 0 0" position="relative">
              <h6>
                Zone Description
                <StyledSpan display640="inline-block">
                  {" "}
                  (10-100 chars.)
                </StyledSpan>
              </h6>
              <DisplayCount>{zoneDescription.length}</DisplayCount>
              <Field
                name="zoneDescription"
                placeholder="Provide a brief description of your zone."
                component={FormikTextArea}
                style={{width: "500px"}}
              />
            </Box>
            <Grid>
              <Flex
                gridarea="apps"
                margin="40px 0 0 0"
                overflow="initial"
                position="relative">
                <h6>Apps</h6>
                <Field
                  name="app"
                  component={Apps}
                  addApp={this.addApp}
                  options={appData}
                />
              </Flex>
              <StyledFlex gridarea="ref" margin1080="40px 0 0 0">
                <Flex gridarea="courses" overflow="initial" position="relative">
                  <h6>Subscribed Courses</h6>
                  <Field
                    name="course"
                    component="select"
                    onClick={this.addCourse}>
                    <option>first</option>
                    <option>second</option>
                    <option>third</option>
                  </Field>
                </Flex>
              </StyledFlex>
              <StyledFlex gridarea="levels" margin1080="40px 0 0 0">
                <Flex overflow="initial" position="relative">
                  <h6>Set Levels</h6>
                  <p>The minimum level a user has to be to enter this zone.</p>
                  <Field
                    name="courseLevel"
                    component="select"
                    onClick={this.addLevel}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Field>
                </Flex>
              </StyledFlex>
              <StyledFlex gridarea="ageGroup" margin1080="40px 0 0 0">
                <Flex overflow="initial" position="relative">
                  <h6>Age Restrictions</h6>
                  <p>
                    Pick an appropriate age setting or a specific age
                    demographic. Conversations are still not to involve any
                    sexual misconduct or vulgar behaviour.
                  </p>
                  <Field
                    name="ageGroup"
                    component="select"
                    onClick={this.addAge}>
                    <option>Any age</option>
                    <option>Safe for ages 0-2</option>
                    <option>Safe for ages 3+</option>
                    <option>Safe for ages 7+</option>
                    <option>Safe for ages 12+</option>
                    <option>Safe for ages 16+</option>
                    <option>Safe for ages 18+</option>
                    <option>Kindergarten</option>
                    <option>Elementary</option>
                    <option>Middle School</option>
                    <option>High School</option>
                    <option>College</option>
                    <option>Only 18+</option>
                    <option>Only 30+</option>
                    <option>Only 40+</option>
                    <option>Only 50+</option>
                    <option>Only 60+</option>
                  </Field>
                </Flex>
              </StyledFlex>
              <StyledFlex margin1080="40px 0">
                <Button
                  type="submit"
                  color="inherit"
                  disabled={this.state.disabled}>
                  Create Zone
                </Button>
              </StyledFlex>
            </Grid>
          </form>
        </main>
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
