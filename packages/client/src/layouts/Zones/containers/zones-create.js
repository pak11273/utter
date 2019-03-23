import React, {Component} from "react"
import {Helmet} from "react-helmet"

/* import Button from "@material-ui/core/Button" */
import Grid from "@material-ui/core/Grid"
/* /1* import TextField from "@material-ui/core/TextField" *1/ */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
/* import {compose, graphql} from "react-apollo" */

/* import {Field} from "formik" */
/* import {withFormik} from "formik" */
/* import gql from "graphql-tag" */
/* /1* import update from "immutability-helper" *1/ */
import cloneDeep from "lodash/cloneDeep"
import cuid from "cuid"
/* import styled from "styled-components" */
/* import {zoneCreateSchema} from "@utterzone/common" */
/* import appData from "../../../data/appData.js" */
/* import { */
/*   Flex, */
/*   FormikInput, */
/*   FormikSelect, */
/*   FormikTextArea, */
/*   Span */
/* } from "../../../components" */

/* const DisplayCount = styled.div` */
/*   font-size: 0.8rem; */
/*   position: absolute; */
/*   right: 2%; */
/*   top: 6px; */

/*   @media (min-width: 330px) { */
/*     right: 10%; */
/*   } */

/*   @media (min-width: 640px) { */
/*     right: 2%; */
/*   } */

/*   @media (min-width: 740px) { */
/*     right: 10%; */
/*   } */
/* ` */
/* const StyledFlex = styled(Flex)` */
/*   grid-area: ${props => props.gridarea}; */
/*   margin: ${props => props.margin}; */
/*   overflow: initial; */
/*   position: relative; */

/*   @media (min-width: 1080px) { */
/*     margin: ${props => props.margin1080}; */
/*   } */
/* ` */
/* StyledFlex.defaultProps = { */
/*   margin: "80px 0 0 0" */
/* } */

/* const StyledSpan = styled(Span)` */
/*   display: none; */
/*   font-size: 0.6rem; */
/*   padding: 0 0 0 10px; */

/*   @media (min-width: 640px) { */
/*     display: ${props => props.display640}; */
/*   } */
/* ` */
/* const ZONE_CREATE_MUTATION = gql` */
/*   mutation zoneCreate( */
/*     $app: String */
/*     $courseLevel: Int */
/*     $ageGroup: String! */
/*     $owner: String! */
/*     $resources: String */
/*     $zoneName: String! */
/*     $zoneImage: String */
/*     $zoneDescription: String */
/*     $teachingLang: String */
/*     $usingLang: String */
/*   ) { */
/*     zoneCreate( */
/*       input: { */
/*         app: $app */
/*         courseLevel: $courseLevel */
/*         ageGroup: $ageGroup */
/*         owner: $owner */
/*         resources: $resources */
/*         zoneName: $zoneName */
/*         zoneImage: $zoneImage */
/*         zoneDescription: $zoneDescription */
/*         teachingLang: $teachingLang */
/*         usingLang: $usingLang */
/*       } */
/*     ) { */
/*       id */
/*       app */
/*       courseLevel */
/*       ageGroup */
/*       resources */
/*       zoneName */
/*       zoneDescription */
/*       owner { */
/*         username */
/*       } */
/*     } */
/*   } */
/* ` */
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
    // clear state
    this.setState(initialState)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {classes, handleSubmit} = this.props
    /* const {zoneName, zoneDescription} = this.props.values */

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
              {/*
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
          */}
            </Grid>
          </main>
        </form>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ZoneCreate)

/* export default compose( */
/*   graphql(ZONE_CREATE_MUTATION, {name: "zoneCreate"}), */
/*   withFormik({ */
/*     validationSchema: zoneCreateSchema, */
/*     validateOnChange: false, */
/*     validateOnBlur: false, */
/*     mapPropsToValues: () => ({ */
/*       ageGroup: "", */
/*       app: "", */
/*       appLevel: 1, */
/*       course: "", */
/*       courseLevel: "", */
/*       owner: "", */
/*       resources: "", */
/*       zoneName: "", */
/*       zoneImage: */
/*         "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk", */
/*       zoneDescription: "" */
/*     }) */
/*     /1* handleSubmit: async (values, {props}) => { *1/ */
/*     /1*   console.log("props: ", props) *1/ */
/*     /1*   console.log("values: ", values) *1/ */
/*     /1* const result = await props.submit(values) *1/ */
/*     /1* const chatHistory = [] *1/ */
/*     /1* const onComplete = result => { *1/ */
/*     /1*   history.push({ *1/ */
/*     /1*     pathname: `/zone/${result.zoneCreate.id}`, *1/ */
/*     /1*     state: {chatHistory, zoneId: result.zoneCreate.id} *1/ */
/*     /1*   }) *1/ */
/*     /1*   console.log("result: ", result.zoneCreate) *1/ */
/*     /1* } *1/ */

/*     // if create is legit */
/*     /1* if (result) { *1/ */
/*     /1*   onComplete(result) *1/ */
/*     /1*   props.addFlashMessage({ *1/ */
/*     /1*     type: "success", *1/ */
/*     /1*     text: "Zone successfully created!" *1/ */
/*     /1*   }) *1/ */
/*     /1* } else { *1/ */
/*     /1*   setErrors(result.zoneCreate.errors) *1/ */
/*     /1*   props.addFlashMessage({ *1/ */
/*     /1*     type: "error", *1/ */
/*     /1*     text: "Could not create a zone. Please contact technical support." *1/ */
/*     /1*   }) *1/ */
/*     /1* } *1/ */
/*     /1* } *1/ */
/*   })(withStyles(styles)(ZoneCreate)) */
/* ) */
