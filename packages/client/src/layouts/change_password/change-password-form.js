import React, {PureComponent} from "react"
import {withApollo} from "react-apollo"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {toast} from "react-toastify"
import {changePasswordSchema} from "@utterzone/common"
import {FormikInput, Img, Section, Spacer} from "../../components"
import {CHANGE_PASSWORD} from "../../graphql/mutations/user-mutations.js"

import "./forms.css"

const styles = () => ({
  section: {
    justifyContent: "center",
    margin: "50px auto 100px",
    maxWidth: 1240
  }
})

class ChangePasswordForm extends PureComponent {
  render() {
    const {classes, handleSubmit} = this.props
    return (
      <Section className={classes.section}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} align="center">
            <Img
              alt="Visiting People"
              margin="0 0 40px 0"
              src="https://media.swncdn.com/cms/CW/faith/31429-speaking-in-front-of-crowd-1200.jpg"
            />
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              noWrap>
              Education increases life opportunities.
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              &quot;The great aim of education is not knowledge but
              action.&quot;
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              &mdash;Herbert Spencer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} align="center">
            <form onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Typography
                align="center"
                variant="h6"
                color="inherit"
                gutterBottom
                noWrap>
                Change Password
              </Typography>
              <Field
                name="password"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                component={FormikInput}
              />
              <Field
                name="password confirmation"
                placeholder="password confirmation"
                type="password"
                component={FormikInput}
              />
              <Button
                color="inherit"
                floated="right"
                fontSize="1.5rem"
                style={{margin: "30px 0 0 0"}}
                type="submit">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Section>
    )
  }
}

export default withApollo(
  withRouter(
    withFormik({
      validationSchema: changePasswordSchema,
      validateOnChange: false,
      validateOnBlur: false,
      mapPropsToValues: () => ({
        password: "",
        "password confirmation": ""
      }),
      handleSubmit: async (values, {props}) => {
        console.log("values: ", values)
        console.log("prps: ", props)
        const data = await props.client.mutate({
          mutation: CHANGE_PASSWORD,
          variables: {
            password: values.password,
            passwordConfirmation: values["password confirmation"],
            token: props.token
          }
        })

        const onComplete = () => {
          toast.success(
            "Password change successful.  Try logging in with your new password.",
            {
              className: "toasty",
              bodyClassName: "toasty-body",
              hideProgressBar: true
            }
          )
          props.history.push("/login")
        }

        if (data.data.changePasswor && data.data.changePassword.error) {
          toast.warn(data.data.changePassword.error[0].message, {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
          props.history.push("/forgot-password")
        } else {
          onComplete()
        }
      }
    })(withStyles(styles)(ChangePasswordForm))
  )
)
