import React, {PureComponent} from "react"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import {FormikInput, Img, Section, Spacer} from "../../components"
import {history} from "@utterzone/connector"
import visitingImg from "../../assets/images/walking-around.jpg"

const styles = () => ({
  section: {
    justifyContent: "center",
    margin: "50px auto 100px",
    maxWidth: 1240
  }
})

class ForgotPasswordForm extends PureComponent {
  render() {
    const {classes, handleSubmit} = this.props
    return (
      <Section className={classes.section}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            align="center"
            className={classes.leftSide}>
            <Img
              centered
              alt="Visiting People"
              margin="0 0 40px 0"
              src={`${visitingImg}`}
            />
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              noWrap>
              Studies show bilingual people are smarter than the average.
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              &quot;Knowledge of language is the doorway to wisdom.&quot;
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              &mdash;Roger Bacon
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
                We need to confirm your account before changing your password.
              </Typography>
              <Field name="email" placeholder="email" component={FormikInput} />
              <Button style={{margin: "40px"}} fontSize="1.5rem" type="submit">
                Reset Password
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
    mapPropsToValues: () => ({
      email: ""
    }),
    handleSubmit: async (values, {props}) => {
      const onComplete = () => {
        history.push("/a/reset-password", {
          announcement: "Please check your email to reset your password."
        })
      }
      const errors = await props.submit(values)
      if (!errors) {
        onComplete()
      }
    }
  })(withStyles(styles)(ForgotPasswordForm))
)
