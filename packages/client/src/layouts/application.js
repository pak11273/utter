import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"
import {compose, withApollo} from "react-apollo"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import cloneDeep from "lodash/cloneDeep"
import {cookies, session} from "brownies"

import {signupSchema} from "@utterzone/common"
import {
  FormikInput,
  FormikTextArea,
  LoadingButton,
  Section
} from "../components"
/* import visitingImg from "../../assets/images/walking-around.jpg" */
import gql from "graphql-tag"

const NEW_SIGNUP = gql`
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

  render() {
    const {
      classes,
      /* errors, */
      /* handleBlur, */
      handleSubmit
      /* Message, */
      /* touched */
      /* values */
    } = this.props

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
            {/*      <Img
              alt="Join our Community"
              margin="0 0 40px 0"
              src={`${visitingImg}`}
            /> */}
            <Typography
              align="center"
              variant="h4"
              color="inherit"
              gutterBottom
              noWrap>
              What to expect
            </Typography>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This platform is designed for people who want to learn a new
              language. More specifally, it is a platform to help language
              learners practice speaking their target language.
            </Typography>
            <Typography
              align="center"
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
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This first beta is limited to only 100 users. We are looking for
              serious language learners who will be putting the time into
              testing our platform to aid in their language learning journey.
              You have a increased chance of a beta spot if we see you are
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
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
              This is not a &quot;one stop&quot; language learning platform. We
              are exclusively focusing on one aspect of language learning.
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
                    First Name
                  </Typography>
                  <Field
                    name="username"
                    placeholder="firstname"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    Last Name
                  </Typography>
                  <Field
                    name="username"
                    placeholder="lastname"
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
                    What country do you live in?
                  </Typography>
                  <Field
                    name="country"
                    placeholder="country"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    Why are you learning a new language?
                  </Typography>
                  <Field
                    name="why"
                    component={FormikTextArea}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    What is your native tongue?
                  </Typography>
                  <Field
                    name="nativeLang"
                    placeholder="nativeLang"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
                    How many languages can you currently speak fluently?
                  </Typography>
                  <Typography component="p" color="inherit" noWrap>
                    What language are you currently trying to learn?
                  </Typography>
                  <Typography component="p" color="inherit" noWrap>
                    How long have you been actively learning this language?
                  </Typography>
                  <Typography component="p" color="inherit" noWrap>
                    How many hours do you spend a day learning a new language?
                  </Typography>
                </div>
                <LoadingButton
                  floated="right"
                  fontSize="1.5rem"
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
          query: NEW_SIGNUP,
          variables: {
            token: cookies._uid
          }
        })

        session.user = loginResult.data.getUserByToken

        props.history.push("/a/confirm-email", {
          announcement: "Please check your email to confirm your address."
        })
      }
      console.log("sinpu: ", signupResult)
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
