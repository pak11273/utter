import React, {PureComponent} from "react"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {changePasswordSchema} from "@utterzone/common"
import {FormikInput, Img, Section, Spacer} from "../../components"
import {history} from "@utterzone/connector"

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

export default connect(
  null,
  null
)(
  withFormik({
    validationSchema: changePasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      password: "",
      "password confirmation": ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      values.token = props.token
      const onComplete = () => {
        history.push("/")
      }
      const data = await props.submit(values)
      const errors = data.data.changePassword.error
      if (errors[0]) {
        setErrors(errors[0])
      } else {
        onComplete()
      }
    }
  })(withStyles(styles)(ChangePasswordForm))
)
