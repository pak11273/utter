import React, {useState} from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Grid from "@material-ui/core/Grid"
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {compose, withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
/* import cuid from "cuid" */
import {zoneCreateSchema} from "@utterzone/common"
import appData from "../../../data/appData.js"
import {
  Flex,
  FormikInput,
  FormikSelect,
  FormikTextArea,
  LoadingButton
} from "../../../components"
import {ZONE_CREATE_MUTATION} from "../../../graphql/mutations/zone-mutaions.js"
import {REMOVE_SUBSCRIPTION} from "../../../graphql/mutations/user-mutations.js"
import {GET_LEVELS, GET_LEVEL} from "../../../graphql/queries/level-queries.js"
import {options} from "../options.js"

import {session} from "brownies"
import {DisplayCount, StyledSpan, styles} from "../styles.js"
import "../overrides.css"

const ZoneCreate = props => {
  const [state, changeState] = useState({
    public: true,
    reserved: false
  })

  /* useEffect(() => { */
  /* 	// TODO: Check use subscriptions to ensure subscribed courses are still active.  Remove any courses that can't be found from user subscriptions */

  /* 	// get courses o */

  /* 	session.user.subscriptions.map(() => { */
  /* 			GET_COURSE */
  /* 	}) */
  /* },[]) */

  const handleChange = name => event => {
    changeState({
      ...state,
      [name]: event.target.checked
    })
    props.setFieldValue("reserved", event.target.checked)
  }

  const subscribedOptions =
    session.user && session.user.subscriptions
      ? session.user.subscriptions.map(item => {
          return {
            value: item._id,
            label: item.title
          }
        })
      : [{}]

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
                className="custom_input"
                name="courseLevel"
                type="text"
                component={FormikInput}
                style={{width: "100px"}}
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
            <Grid item xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      disableRipple
                      checked={state.reserved}
                      onChange={handleChange("reserved")}
                      value="reserved"
                    />
                  }
                  label="Private Zone"
                />
                {state.reserved && (
                  <Flex flexdirection="row">
                    <Field
                      className="custom_input"
                      name="password"
                      type="text"
                      component={FormikInput}
                      style={{width: "100px"}}
                    />
                    <p style={{padding: "10px"}}>require a zone password</p>
                  </Flex>
                )}
              </FormGroup>
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
      reserved: false,
      password: "",
      zoneName: "",
      zoneDescription: ""
    }),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
      console.log("values: ", values)
      try {
        const courseLevels = await props.client.query({
          fetchPolicy: "network-only",
          query: GET_LEVELS,
          variables: {
            courseId: values.course
          }
        })
        console.log("levels: ", courseLevels)

        const {levels} = courseLevels.data.getLevels
        const index = parseInt(values.courseLevel, 10)
        session.level = index
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

        session.vocabulary = courseLevel.data.getLevel.vocabulary

        console.log("values; ", values)
        const result = await props.client.mutate({
          mutation: ZONE_CREATE_MUTATION,
          variables: {
            ageGroup: values.ageGroup,
            app: values.app,
            appLevel: values.appLevel,
            course: values.course,
            courseLevel: values.courseLevel,
            owner: values.owner,
            reserved: values.reserved,
            password: values.password,
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
        const msg = err.message.replace("GraphQL error:", "").trim()
        if (err.message.indexOf("was not found")) {
          // remove course from user subscriptions
          const checkSubs = await props.client.mutate({
            mutation: REMOVE_SUBSCRIPTION,
            variables: {
              subscribedCourse: values.course
            }
          })

          session.user = checkSubs.data.removeSubscription

          toast.warn(msg, {
            autoClose: 15000,
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        }
        // TODO: uncomment when launching
        /*  else if (err.message.indexOf("You can only host")) { */
        /*   props.history.push({ */
        /*     pathname: "/zones/rezone" */
        /*     /1* state: {courseId: course.data.courseCreate._id} *1/ */
        /*   }) */
        /*   toast.warn(msg, { */
        /*     className: "toasty", */
        /*     bodyClassName: "toasty-body", */
        /*     hideProgressBar: true */
        /*   }) */
        /* } else if (err.message.indexOf("Cast to ObjectId failed for value")) { */
        /*   setErrors({ */
        /*     courseLevel: "This course does not contain a level with this number" */
        /*   }) */
        /* } */

        setSubmitting(false)
        return null
      }
    }
  }),
  withStyles(styles)
)(ZoneCreate)
