import React, {PureComponent} from "react"
import {withFormik, Field} from "formik"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import cloneDeep from "lodash/cloneDeep"
import {local} from "brownies"

import Terms from "../../documents/terms-and-conditions.js"
/* import Timezones from "../../components/Selects/Timezones/Timezones.js" */
import {signupSchema} from "@utterzone/common"
import {history} from "@utterzone/connector"
import {FormikInput, Img, LoadingButton, Section} from "../../components"
import visitingImg from "../../assets/images/walking-around.jpg"

const styles = () => ({
  agreement: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    right: "0px",
    bottom: "-60px",
    position: "absolute"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    margin: "0 auto",
    width: "100%"
  },
  formContainer: {
    margin: "0 auto",
    position: "relative",
    width: "260px"
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  section: {
    justifyContent: "center",
    margin: "50px auto 100px",
    maxWidth: 1240
  }
})

const initialState = {
  agreementChecked: true
}

class SignupForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
  }

  handleChange = e => {
    e.preventDefault()
    const {agreementChecked} = this.state
    if (this.setState) {
      this.setState({
        agreementChecked: !agreementChecked
      })
    }
  }

  render() {
    const {
      classes,
      /* errors, */
      /* handleChange, */
      /* handleBlur, */
      handleSubmit
      /* Message, */
      /* touched */
      /* values */
    } = this.props
    const {agreementChecked} = this.state
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
              alt="Join our Community"
              margin="0 0 40px 0"
              src={`${visitingImg}`}
            />
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              Join our Community
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              Become part of a growing community of avid learners like yourself
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={classes.form}>
                  <Typography variant="h4" color="inherit" gutterBottom noWrap>
                    Registration
                  </Typography>
                  <Typography component="p" color="inherit" noWrap>
                    username
                  </Typography>
                  <Field
                    name="username"
                    placeholder="username"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    email
                  </Typography>
                  <Field
                    name="email"
                    placeholder="email"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    password
                  </Typography>
                  <Typography
                    style={{fontSize: "8px"}}
                    component="p"
                    color="inherit"
                    noWrap>
                    (Must contain 1 lowercase, 1 uppercase and 1 special)
                    character
                  </Typography>
                  <Field
                    name="password"
                    placeholder="password"
                    autoComplete="new-password"
                    type="password"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    password confirmation
                  </Typography>
                  <Field
                    name="password confirmation"
                    placeholder="password confirmation"
                    autoComplete="new-password"
                    type="password"
                    component={FormikInput}
                  />
                  {/*  <div>
			  <Typography
                      component="p"
                      color="inherit"
                      gutterBottom
                      noWrap>
                      timezone
                    </Typography>
                    <Field
                      name="timezone"
                      type="text"
                      component={FormikSelect}
                      options={timezones}
                    /> 

                    {errors.timezone &&
                      touched.timezone && (
                        <Message
                          className="error-msg"
                          error
                          content={errors.timezone}
                        />
                      )} 
                  </div> */}
                </div>
                <div className={classes.agreement}>
                  <input
                    type="checkbox"
                    label="I agree to the"
                    onChange={this.handleChange}
                  />
                  <span>
                    <Terms />
                  </span>
                </div>
                <LoadingButton
                  floated="right"
                  fontSize="1.5rem"
                  style={{margin: "30px 0 0 0"}}
                  className={classes.button}
                  disabled={agreementChecked}
                  color="primary"
                  variant="contained"
                  type="submit">
                  Join
                </LoadingButton>
              </form>
            </div>
          </Grid>
        </Grid>
      </Section>
    )
  }
}

export default withFormik({
  validationSchema: signupSchema,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password: "",
    "password confirmation": "",
    timezone: ""
  }),
  handleSubmit: async (values, {props, setErrors}) => {
    const result = await props.submit(values)
    const onComplete = () => {
      history.push("/a/confirm-email", {
        announcement: "Please check your email to confirm your address."
      })
    }

    // if signup info is legit
    if (typeof result === "string") {
      local.AUTH_TOKEN
      onComplete()
      props.addFlashMessage({
        type: "success",
        text: "Welcome to Utterzone"
      })
    } else {
      // if signup info is not legit
      console.log("signup: ", result)
      setErrors(result)
    }
  }
})(withStyles(styles)(SignupForm))
