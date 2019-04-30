import React, {PureComponent} from "react"
import {compose, graphql, withApollo} from "react-apollo"
import {withRouter} from "react-router-dom"
import {withFormik, Field} from "formik"
import isEmpty from "lodash/isEmpty"
import {normalizeErrors} from "../../utils/normalize-errors"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {cookies, session} from "brownies"

import {loginSchema} from "@utterzone/common"
import {LOGIN_MUTATION} from "../../graphql/mutations/user-mutations.js"
/* import {ME_QUERY} from "../../graphql/queries/user-queries.js" */
import {FormikInput, Img, Section} from "../../components"
import visitingImg from "../../assets/images/walking-around.jpg"

import {styles} from "./styles.js"
import "./forms.css"

class LoginForm extends PureComponent {
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
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              gutterBottom
              style={{margin: "0 0 50px 0"}}>
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
                  <Typography component="p" color="inherit" noWrap>
                    credentials
                  </Typography>
                  <Field
                    name="username or email"
                    placeholder="username or email"
                    component={FormikInput}
                  />
                  <Typography component="p" color="inherit" noWrap>
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

export default compose(
  withRouter,
  withApollo,
  graphql(LOGIN_MUTATION),
  /* { */
  /* options: { */
  /* update: (proxy, {data}) => { */
  /* if (!data || !data.login) { */
  /* return */
  /* } */
  /* proxy.writeQuery({ME_QUERY, data: {me: data.login}}) */
  /* } */
  /* } */
  /* }), */
  withStyles(styles),
  withFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      "username or email": "",
      password: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const submit = async () => {
        const response = await props.mutate({
          variables: {
            identifier: values["username or email"],
            password: values.password
          }
        })

        const {error} = response.data.login
        const {token} = response.data.login

        if (!isEmpty(error)) {
          return normalizeErrors(error)
        }
        return {
          ...response.data.login,
          token,
          error
        }
      }

      const data = await submit(values)

      if (!data.token) {
        if (data.identifier) {
          data["username or email"] = data.identifier
        }
        setErrors(data)
      }
      if (data.token) {
        cookies._uid = data.token

        session.user = data.user
        props.history.push({
          pathname: "/",
          state: "loadUserSession"
        })
      }
    }
  })
)(LoginForm)
