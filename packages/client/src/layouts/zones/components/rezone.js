import React from "react"
import {withRouter} from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {compose, graphql, withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {Field, withFormik} from "formik"
/* import cuid from "cuid" */
import {rezoneSchema} from "@utterzone/common"
import {FormikInput, LoadingButton} from "../../../components"
import {ZONE_CREATE_MUTATION} from "../../../graphql/mutations/zone-mutaions.js"
import {GET_LEVELS, GET_LEVEL} from "../../../graphql/queries/level-queries.js"

import {session} from "brownies"
import {styles} from "../styles.js"

const Rezone = props => {
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
                Return to Zone
              </Typography>
              <Typography
                align="center"
                variant="h6"
                className={classes.heading}
                gutterBottom>
                Got cut from your zone? You can get back to it from here.
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
                Enter your username
              </Typography>
              <Field
                fullWidth
                id="outlined-search"
                name="username"
                label="username"
                type="text"
                className={classes.searchField}
                component={FormikInput}
                margin="normal"
                variant="outlined"
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
                ReHost Zone
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
  graphql(ZONE_CREATE_MUTATION, {name: "rezone"}),
  withRouter,
  withFormik({
    validationSchema: rezoneSchema,
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
        console.log("inde: ", index)
        console.log("thing: ", levels[3 - 1])
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

        const result = await props.rezone({
          variables: {
            owner: values.owner
          }
        })

        // TODO vocabulary will be lost so host must GET_VOCAB again before entering zone.
        const onComplete = zone => {
          session.zone = zone.data.rezone
          props.history.push({
            pathname: `/zone/${zone.data.rezone._id}`,
            state: {zoneId: zone.data.rezone._id}
          })
        }

        // if result is legit
        if (result) {
          onComplete(result)
          toast.success("You have successfully reconnected to your zone.", {
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
        const msg = err.message.replace("GraphQL error:", "").trim()
        if (err.message.indexOf("You can only host")) {
          toast.warn(msg, {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        } else if (err.message.indexOf("Cast to ObjectId failed for value")) {
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
)(Rezone)
