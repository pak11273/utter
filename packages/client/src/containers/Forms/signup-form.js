import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"
import {compose, withApollo} from "react-apollo"

import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import cloneDeep from "lodash/cloneDeep"
import {cookies, session} from "brownies"

import Terms from "../../documents/terms-and-conditions.js"
/* import Timezones from "../../components/Selects/Timezones/Timezones.js" */
import {signupSchema} from "@utterzone/common"
import {FormikInput, Img, LoadingButton, Section} from "../../components"
import visitingImg from "../../assets/images/walking-around.jpg"
import gql from "graphql-tag"

const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      blocked
      contacts
      createdCourses {
        _id
      }
      _id
      roles
      rights
      subscriptions {
        _id
        title
        levels {
          level
        }
      }
      username
    }
  }
`
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
  agreementChecked: false
}

class SignupForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
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
    const {
      classes,
      /* errors, */
      /* handleCheckbox, */
      /* handleBlur, */
      handleSubmit
      /* Message, */
      /* touched */
      /* values */
    } = this.props

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
                  disabled={!agreementChecked}
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
    handleSubmit: async (values, {props, setErrors}) => {
      const signupResult = await props.submit(values)
      const onComplete = async () => {
        const loginResult = await props.client.query({
          query: GET_USER_BY_TOKEN,
          variables: {
            token: cookies._uid
          }
        })

        session.user = loginResult.data.getUserByToken

        props.history.push("/a/confirm-email", {
          announcement: "Please check your email to confirm your address."
        })
      }

      // if signup info is legit
      if (typeof signupResult !== "object") {
        cookies._uid = signupResult
        onComplete()
      } else {
        // if signup info is not legit
        setErrors(signupResult)
      }
    }
  })
)(SignupForm)
