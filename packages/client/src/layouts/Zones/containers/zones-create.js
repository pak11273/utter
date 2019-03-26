import React, {Component} from "react"
import {Helmet} from "react-helmet"
import {withRouter} from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {compose, graphql} from "react-apollo"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
import gql from "graphql-tag"
import cloneDeep from "lodash/cloneDeep"
import cuid from "cuid"
import styled from "styled-components"
import {zoneCreateSchema} from "@utterzone/common"
import appData from "../../../data/appData.js"
import {
  FormikInput,
  FormikSelect,
  FormikTextArea,
  LoadingButton,
  Span
} from "../../../components"
import {session} from "brownies"

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
const StyledSpan = styled(Span)`
  display: none;
  font-size: 0.6rem;
  padding: 0 0 0 10px;

  @media (min-width: 640px) {
    display: ${props => props.display640};
  }
`
const ZONE_CREATE_MUTATION = gql`
  mutation zoneCreate(
    $app: String
    $courseLevel: Int
    $ageGroup: String!
    $owner: String!
    $zoneName: String!
    $zoneDescription: String
    $teachingLang: String
    $usingLang: String
  ) {
    zoneCreate(
      input: {
        app: $app
        courseLevel: $courseLevel
        ageGroup: $ageGroup
        owner: $owner
        zoneName: $zoneName
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      _id
      app
      courseLevel
      ageGroup
      zoneName
      zoneDescription
      owner {
        username
      }
    }
  }
`
const initialState = {
  ageGroup: "Any age",
  cdn: {},
  charCount: 0,
  course: "",
  zoneId: cuid(),
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
    this.setState({...initialState, owner: session.user._id})
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {classes, handleSubmit, isSubmitting} = this.props
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
                      value: 1,
                      label: "1",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: 2,
                      label: "2",
                      className: "courseHeader",
                      disabled: false
                    },
                    {
                      value: 3,
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
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  type="submit"
                  size="large"
                  loading={isSubmitting}
                  disabled={isSubmitting}>
                  Create Zone
                </LoadingButton>
              </Grid>
            </Grid>
          </main>
        </form>
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(ZONE_CREATE_MUTATION, {name: "zoneCreate"}),
  withRouter,
  withFormik({
    validationSchema: zoneCreateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      ageGroup: "",
      app: "",
      appLevel: 1,
      course: "",
      courseLevel: 1,
      owner: session.user._id,
      zoneName: "",
      zoneDescription: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.zoneCreate({
        variables: {
          ageGroup: values.ageGroup,
          app: values.app,
          appLevel: values.appLevel,
          course: values.course,
          courseLevel: values.courseLevel,
          owner: values.owner,
          zoneName: values.zoneName,
          zoneDescription: values.zoneDescription
        }
      })

      const onComplete = zone => {
        session.zone = zone.data.zoneCreate
        props.history.push({
          pathname: `/zone/${zone.data.zoneCreate._id}`,
          state: {zoneId: zone.data.zoneCreate._id}
        })
      }

      // if result is legit
      if (result) {
        onComplete(result)
        toast.success("You have successfully created a zone.", {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      } else {
        setErrors(result.ZONE_CREATE_MUTATION.errors)
        toast.success("Something went wrong. Could not create a zone.", {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      }
    }
  }),
  withStyles(styles)
)(ZoneCreate)
