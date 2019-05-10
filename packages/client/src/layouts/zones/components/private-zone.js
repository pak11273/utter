/* import React, {useState} from "react" */
import React from "react"
import {withRouter} from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {compose, graphql, withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
/* import cuid from "cuid" */
import {zoneCreateSchema} from "@utterzone/common"
import {FormikInput, LoadingButton} from "../../../components"
import {ZONE_CREATE_MUTATION} from "../../../graphql/mutations/zone-mutaions.js"
import {GET_LEVELS, GET_LEVEL} from "../../../graphql/queries/level-queries.js"

import {session} from "brownies"
import {styles} from "../styles.js"
import "../overrides.css"

const ZoneCreate = props => {
  /* const [state, changeState] = useState({ */
  /*   public: true, */
  /*   private: false */
  /* }) */

  /* const handleChange = name => event => { */
  /*   changeState({ */
  /*     ...state, */
  /*     [name]: event.target.checked */
  /*   }) */
  /*   props.setFieldValue("private", event.target.checked) */
  /* } */

  const {classes, handleSubmit, isSubmitting} = props

  return (
    <React.Fragment>
      <form className={classes.rootZoneCreate} onSubmit={handleSubmit}>
        <div className={classes.heroUnitZoneCreate}>
          <div className={classes.heroContentZoneCreate}>
            <Grid container justify="center" direction="column">
              <Typography
                align="center"
                variant="h4"
                className={classes.heading}
                gutterBottom>
                Enter a Private Zone
              </Typography>
              <Typography
                align="center"
                variant="h6"
                className={classes.heading}
                gutterBottom>
                Private zones are made available for people who want a learn
                with people they choose. Private rooms are not listed on the
                website zones list so you must inform the people you want to
                joint your username and a password if you required one. All
                public rules apply to private rooms.
              </Typography>
            </Grid>
          </div>
        </div>
        <main className={classes.content}>
          <Grid container spacing={24} justify="center" alignContent="center">
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                className={classes.subHeading}
                gutterBottom>
                Enter host name
              </Typography>
              <Field
                className="custom_input"
                name="username"
                type="text"
                component={FormikInput}
                style={{width: "100px"}}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="left"
                variant="h6"
                className={classes.subHeading}
                gutterBottom>
                Enter Password
              </Typography>
              <Field
                className="custom_input"
                name="password"
                type="text"
                component={FormikInput}
                style={{width: "100px"}}
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
                Enter Zone
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
      private: false,
      password: "",
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
        const result = await props.zoneCreate({
          variables: {
            ageGroup: values.ageGroup,
            app: values.app,
            appLevel: values.appLevel,
            course: values.course,
            courseLevel: values.courseLevel,
            owner: values.owner,
            private: values.private,
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
        console.log("errors: ", err)
        // TODO: uncomment when launching
        /* /1* console.error("TEST ERR =>", err.graphQLErrors.map(x => x.message)); *1/ */
        /* const msg = err.message.replace("GraphQL error:", "").trim() */
        /* if (err.message.indexOf("You can only host")) { */
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
