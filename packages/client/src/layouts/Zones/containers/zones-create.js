import React from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {compose, graphql, withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
/* import cuid from "cuid" */
import {zoneCreateSchema} from "@utterzone/common"
import appData from "../../../data/appData.js"
import {
  FormikInput,
  FormikSelect,
  FormikTextArea,
  LoadingButton
} from "../../../components"
import {ZONE_CREATE_MUTATION} from "../zone-queries.js"
import {GET_LEVELS, GET_LEVEL} from "../../levels/xhr.js"
import {options} from "../options.js"

import {session} from "brownies"
import {DisplayCount, StyledSpan, styles} from "../styles.js"

const ZoneCreate = props => {
  const subscribedOptions =
    session.user && session.user.subscriptions
      ? session.user.subscriptions.map(item => {
          return {
            value: item._id,
            label: item.title
          }
        })
      : [{}]
  /* const [owner, setOwner] = useState(session.user._id) */

  /* const initialState = { */
  /*   ageGroup: "Any age", */
  /*   cdn: {}, */
  /*   charCount: 0, */
  /*   course: "", */
  /*   zoneId: cuid(), */
  /*   zoneRef: "", */
  /*   displayName: "", */
  /*   errors: {}, */
  /*   levels: [{level: 1, cuid: cuid()}], */
  /*   appLevel: "", */
  /*   loading: false, */
  /*   owner: "", */
  /*   public_id: "", */
  /*   secure_url: "", */
  /*   signature: "", */
  /*   terms: [{word: "Change me", translation: "Change me", audio: "audio.mp3"}], */
  /*   url: "" */
  /* } */

  const {classes, handleSubmit, isSubmitting} = props
  const {zoneName, zoneDescription} = props.values

  return (
    <React.Fragment>
      <form className={classes.rootZoneCreate} onSubmit={handleSubmit}>
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
        <div className={classes.heroUnitZoneCreate}>
          <div className={classes.heroContentZoneCreate}>
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
                <StyledSpan display640="inline-block">(3-40 chars.)</StyledSpan>
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
                {...props}
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
                {...props}
                options={subscribedOptions}
              />
              <Typography
                align="left"
                variant="h6"
                className={classes.subHeading}
                gutterBottom>
                Set Level
              </Typography>
              <p style={{padding: "10px"}}>
                Apps will use the course information from this level.
              </p>
              <Field
                name="courseLevel"
                type="text"
                component={FormikInput}
                style={{width: "80px"}}
              />
              {/* <Field
                  name="courseLevel"
                  type="text"
                  component={FormikSelect}
                  {...props}
                  options={[
                    {
                      value: 1,
                      label: "1",
                      className: "courseHeader",
                      disabled: false
                    }
                  ]}
                /> */}
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                className={classes.subHeading}
                gutterBottom>
                Age Restrictions
              </Typography>
              <p style={{padding: "10px"}}>
                Pick an appropriate age setting or a specific age demographic.
                Conversations are still not to involve any sexual misconduct or
                vulgar behaviour. Account bans/suspensions are duly enforced.
              </p>
              <Field
                name="ageGroup"
                type="text"
                component={FormikSelect}
                {...props}
                options={options}
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

export default compose(
  withApollo,
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
      courseLevel: "",
      owner: session.user._id,
      zoneName: "",
      zoneDescription: ""
    }),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
      try {
        const courseLevels = await props.client.query({
          query: GET_LEVELS,
          variables: {
            courseId: values.course
          }
        })

        const {levels} = courseLevels.data.getLevels
        console.log("levle: ", levels)
        const index = parseInt(values.courseLevel, 10)
        if (!levels[index - 1]) {
          setErrors({
            courseLevel: "This course does not contain a level with this number"
          })
          setSubmitting(false)
          return null
        }

        const courseLevel = await props.client.query({
          query: GET_LEVEL,
          variables: {
            levelId: levels[values.courseLevel - 1]._id
          }
        })
        console.log("leve blahl: ", levels[values.courseLevel - 1]._id)
        console.log("course lvel :", courseLevel)

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
          toast.success("Could not create a zone, please try again.", {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        }
      } catch (err) {
        console.log("errors: ", err)
        /* console.error("TEST ERR =>", err.graphQLErrors.map(x => x.message)); */
        /* const msg = err.message.replace('GraphQL error:', '').trim() */
        if (err.message.indexOf("Cast to ObjectId failed for value")) {
          setErrors({
            courseLevel: "This course does not contain a level with this number"
          })
        }

        setSubmitting(false)
        return null
      }
    }
  }),
  withStyles(styles)
)(ZoneCreate)
