import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"
import {compose, withApollo} from "react-apollo"

import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import isEmpty from "lodash/isEmpty"

import {normalizeErrors} from "../../utils/normalize-errors"
import Terms from "../../documents/terms-and-conditions.js"
/* import Timezones from "../../components/Selects/Timezones/Timezones.js" */
import {signupSchema} from "@utterzone/common"
import {FormikInput, Img, LoadingButton, Section} from "../../components"
import visitingImg from "../../assets/images/walking-around.jpg"
import {SIGNUP_MUTATION} from "../../graphql/mutations/user-mutations.js"
import {styles} from "./styles.js"

class SignupForm extends PureComponent {
  state = {
    agreementChecked: false,
  }

  agreeTerms = () => {
    if (this.setState) {
      this.setState({
        agreementChecked: true
      })
    }
  }

  disagreeTerms = () => {
    if (this.setState) {
      this.setState({
        agreementChecked: false
      })
    }
  }

  handleCheckbox = e => {
    e.preventDefault()
    const {agreementChecked} = this.state
    if (this.setState) {
      this.setState({
        agreementChecked: !agreementChecked
      })
    }
  }

  render() {
    const {classes, handleSubmit, isSubmitting} = this.props

    const {agreementChecked} = this.state

    return (
      <Section className={classes.section}>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Affordable language learning" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Sign Up</title>
          <link rel="canonical" href="https://utter.zone/signup" />
        </Helmet>
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
                  <Checkbox
                    checked={this.state.agreementChecked}
                    onClick={this.handleCheckbox}
                    value="I agree to the"
                  />
                  <Terms
                    agree={() => this.agreeTerms()}
                    disagree={() => this.disagreeTerms()}
                  />
                </div>
                <LoadingButton
                  floated="right"
                  fontSize="1.5rem"
                  style={{margin: "30px 0 0 0"}}
                  className={classes.button}
                  disabled={!agreementChecked || isSubmitting}
                  loading={isSubmitting}
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

export default compose(
  withApollo,
  withRouter,
  withStyles(styles),
  withFormik({
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
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
      console.log("props: ", props)
      const submit = async () => {
        const response = await props.client.mutate({
          mutation: SIGNUP_MUTATION,
          variables: {
            username: values.username,
            email: values.email,
            password: values.password,
            passwordConfirmation: values["password confirmation"],
            timezone: values.timezone
          }
        })

        const {error} = response.data.signup
        const {token} = response.data.signup

        if (!isEmpty(error)) {
          return normalizeErrors(error)
        }
        return {
          ...response.data.signup,
          token,
          error
        }
      }

      const data = await submit(values)

      if (!isEmpty(data)) {
        setSubmitting(false)
        setErrors(data)
      }

      const onComplete = async () => {
        props.history.push("/a/confirm-email", {
          announcement: "Please check your email to confirm your address."
        })
      }
      // if signup info is legit
      if (data.token) {
        onComplete()
      } else {
        setSubmitting(false)
        return setErrors(data)
      }
    }
  })
)(SignupForm)
