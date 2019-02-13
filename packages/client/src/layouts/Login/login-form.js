import React, {PureComponent} from "react"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {loginSchema} from "@utterzone/common"
import {FormikInput, Img, Section} from "../../components"
import {history} from "@utterzone/connector"
import visitingImg from "../../assets/images/walking-around.jpg"

// actions
import "./forms.css"

const styles = () => ({
  button: {
    right: "0px",
    bottom: "-60px",
    position: "absolute"
  },
  forgot: {
    position: "absolute",
    right: "0px",
    top: "13px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    margin: "100px auto",
    width: "100%"
  },
  formContainer: {
    margin: "0 auto",
    position: "relative",
    width: "260px"
  },
  section: {
    justifyContent: "center",
    margin: "100px auto 50px",
    maxWidth: 1240
  }
})

class LoginForm extends PureComponent {
  render() {
    const {classes, handleSubmit} = this.props
    return (
      <Section className={classes.section}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} align="center">
            <Img
              centered
              alt="Explore a New World"
              margin="0 0 40px 0"
              src={`${visitingImg}`}
            />
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              Explore a new world
            </Typography>
            <Typography align="center" variant="h6" color="inherit">
              &quot;To have another language is to possess a second soul.&quot;
            </Typography>
            <Typography align="center" variant="h6" color="inherit">
              &mdash;Charlemagne
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={classes.form}>
                  <Typography variant="h4" color="inherit" gutterBottom noWrap>
                    Login
                  </Typography>
                  <Typography variant="p" color="inherit" noWrap>
                    credentials
                  </Typography>
                  <Field
                    name="username or email"
                    placeholder="username or email"
                    component={FormikInput}
                  />
                  <Typography variant="p" color="inherit" noWrap>
                    password
                  </Typography>
                  <Field
                    name="password"
                    placeholder="password"
                    autoComplete="new-password"
                    type="password"
                    component={FormikInput}
                  />
                  <div className={classes.forgot}>
                    <a href="/forgot-password"> Forgot Password? </a>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit">
                  submit
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  loginReducer: state.userReducer.login
})

export default connect(
  mapStateToProps,
  null
)(
  withFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      "username or email": "",
      password: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const errors = await props.submit(values)
      if (errors) {
        if (errors.identifier) {
          errors["username or email"] = errors.identifier
        }
        setErrors(errors)
      }
      if (!errors) {
        history.push("/")
      }
    }
  })(withStyles(styles)(LoginForm))
)
