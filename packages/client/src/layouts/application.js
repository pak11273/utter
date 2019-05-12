import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"
import {compose, withApollo} from "react-apollo"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import {cookies, session} from "brownies" */
/* import {cookies} from "brownies" */

import {betaSignupSchema} from "@utterzone/common"
import {
  FormikInput,
  FormikSelect,
  FormikTextArea,
  LoadingButton,
  Section
} from "../components"
/* import visitingImg from "../../assets/images/walking-around.jpg" */
/* import gql from "graphql-tag" */
import {BETA_SIGNUP} from "../graphql/mutations/user-mutations.js"

const styles = () => ({
  bottom: {
    marginBottom: "30px"
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
    width: "500px"
  },
  leftSide: {
    display: "flex",
    flexDirection: "column"
  },
  required: {
    color: "red",
    fontSize: ".6em"
  },
  section: {
    justifyContent: "center",
    margin: "50px auto 100px",
    maxWidth: 1240
  },
  top: {
    marginTop: "30px"
  }
})

class BetaApplication extends PureComponent {
  state = {
    age: "",
    gender: "",
    languagesFluent: ""
  }

  componentDidMount = () => {}

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {classes, handleSubmit, isSubmitting} = this.props

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
          <link rel="canonical" href="https://utterzone.com/application" />
        </Helmet>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} className={classes.leftSide}>
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              What to expect
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This platform is designed for people who want to learn a new
              language. More specifally, it is a platform to help language
              learners practice speaking their target language.
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This beta is used to test out the early stages of our platform on
              real users. By gathering your feedback we can build a supepior
              product. We are hoping for a short beta so that we can go live to
              a bigger audience.
            </Typography>
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              Increase your chances
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This first beta is limited to only 100 users. We are looking for
              serious language learners who will be putting the time into
              testing our platform to aid in their language learning journey.
              You have an increased chance at a beta spot if we see you are
              genuine and want to test out something new. We want a reasonable
              amount of time spent on our platform for positive test results.
            </Typography>
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              What we are not
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This is not a &quot;one stop&quot; language learning platform. We
              are emphasizing our focus on helping people practice their
              speaking. Our goal is not making one an expert in a new language.
              Rather we would like to see people be able to have a normal
              conversation with a new language. Meet new people, make new
              friends.
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              We are hoping to start beta mid June. Once we have all the beta
              testers picked we will be sending out emails prior launch. The
              emails will contain your beta test code that will allow you to
              sign up. Once registed you may begin to use the platform.
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This is not a dating platform. There are plans in the future to
              create some areas for this but for now we would ask that use the
              plethora of apps that already provide this.
            </Typography>
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              Application deadline - June 1
            </Typography>
            <Typography
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              If you are not chosen for beta all is not lost. You will receive
              emails which will inform you of any openings and when round 2 will
              start. So please stay tuned. In the meantime, you can ask
              questions or discuss with fellow learners on the{" "}
              <a
                style={{color: "blue"}}
                href="http://utterzone.boards.net/"
                rel="nofollow noopener noreferrer"
                target="_blank">
                forums
              </a>
            </Typography>
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              Good Luck!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={classes.form}>
                  <Typography variant="h4" color="inherit" gutterBottom noWrap>
                    Beta Application
                  </Typography>
                  <Typography component="p" color="inherit" noWrap>
                    First Name{" "}
                    <span className={classes.required}>required</span>
                  </Typography>
                  <Field
                    name="firstName"
                    placeholder="first name"
                    component={FormikInput}
                  />
                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit"
                    noWrap>
                    Last Name <span className={classes.required}>required</span>
                  </Typography>
                  <Field
                    name="lastName"
                    placeholder="last name"
                    component={FormikInput}
                  />
                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit"
                    noWrap>
                    Gender
                  </Typography>

                  <Field
                    {...this.props}
                    name="gender"
                    type="text"
                    component={FormikSelect}
                    options={[
                      {label: "male", value: "male"},
                      {label: "female", value: "female"}
                    ]}
                  />

                  {/* <FormControl className={classes.margin}>
                    <Select
                      name="gender"
                      value={this.state.gender}
                      className={classes.bottom}
                      onChange={this.handleChange}
                      input={
                        <BootstrapInput
                          name="gender"
                          id="age-customized-select"
                        />
                      }>
                      <MenuItem value="male">male</MenuItem>
                      <MenuItem value="female">female</MenuItem>
                    </Select>
                  </FormControl> */}

                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit"
                    noWrap>
                    Age Group
                  </Typography>
                  <Field
                    {...this.props}
                    name="ageGroup"
                    type="text"
                    component={FormikSelect}
                    options={[
                      {label: "under10", value: "under 10"},
                      {label: "under20", value: "under 20"},
                      {label: "under30", value: "under 30"},
                      {label: "under40", value: "under 40"},
                      {label: "over40", value: "over 40"}
                    ]}
                  />

                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit"
                    noWrap>
                    linkedIn profile
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="linkedIn"
                    placeholder="linkedIn"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    email <span className={classes.required}>required</span>
                  </Typography>
                  <Field
                    name="email"
                    placeholder="email"
                    component={FormikInput}
                  />
                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit"
                    noWrap>
                    What country do you live in?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="country"
                    placeholder="country"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    Why are you learning a new language?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="whyLearning"
                    component={FormikTextArea}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    What is your native tongue?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="nativeLang"
                    placeholder="example: English"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit">
                    Not including your native tongue, how many languages can you
                    currently speak fluently?
                  </Typography>

                  <Field
                    {...this.props}
                    name="languagesFluent"
                    type="text"
                    component={FormikSelect}
                    options={[
                      {label: "One", value: "One"},
                      {label: "Two", value: "Two"},
                      {label: "Three", value: "Three"},
                      {label: "Four", value: "Four"},
                      {label: "Five or more", value: "Five or more"}
                    ]}
                  />

                  <Typography
                    className={classes.top}
                    component="p"
                    color="inherit">
                    What languages are you currently trying to learn?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="currentlyLearning"
                    component={FormikTextArea}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    How long have you been actively learning your current target
                    language?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="howLongLearning"
                    placeholder="example: 1 yr"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    How many hours do you spend a day learning a new language?
                  </Typography>
                  <Field
                    className={classes.bottom}
                    name="dayLearningHrs"
                    placeholder="example: 1 hr"
                    component={FormikInput}
                  />
                </div>
                <LoadingButton
                  floated="right"
                  fontSize="1.5rem"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={{margin: "30px 0 0 0"}}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  type="submit">
                  Apply
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
    validationSchema: betaSignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      ageGroup: "",
      country: "",
      currentlyLearning: "",
      dayLearningHrs: "",
      email: "",
      firstName: "",
      gender: "",
      howLongLearning: "",
      lastName: "",
      languagesFluent: "",
      linkedIn: "",
      nativeLang: "",
      whyLearning: ""
    }),
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
      // Add beta user to sendinblue (applications so we can send out emails)
      const info = {
        listIds: ["8"], // 8 = "betaTesters"
        email: values.email,
        FIRSTNAME: values.firstName,
        LASTNAME: values.lastName
      }

      const res = await fetch("https://api.sendinblue.com/v3/contacts", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(info), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.SEND_IN_BLUE_API_KEY
        }
      })
      const data = await res.json()

      if (data.code) {
        setErrors({email: data.message})
        setSubmitting(false)
      }
      // Add beta user to sendinblue (applications so we can send out emails)

      const submit = async () => {
        const betaResult = await props.client.mutate({
          mutation: BETA_SIGNUP,
          variables: {
            ageGroup: values.age,
            country: values.country,
            currentlyLearning: values.currentlyLearning,
            dayLearningHrs: values.dayLearningHrs,
            email: values.email,
            firstName: values.firstName,
            gender: values.gender,
            howLongLearning: values.howLongLearning,
            lastName: values.lastName,
            languagesFluent: values.languagesFluent,
            linkedIn: values.linkedIn,
            nativeLang: values.nativeLang,
            whyLearning: values.whyLearning
          }
        })
        console.log("betaResult: ", betaResult)

        if (betaResult.data.betaSignup) {
          props.history.push("/a/confirm-email", {
            announcement:
              "Thank you for submitting your application.  We will continue correspondence through email."
          })
        }
        setErrors(betaResult.errors)
      }
      const result = await submit(values)
      console.log("submit", result)
    }
  })
)(BetaApplication)
