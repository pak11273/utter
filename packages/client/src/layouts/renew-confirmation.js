import React, {Component} from "react"
import {compose, withApollo} from "react-apollo"

import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Formik, Field} from "formik"
import {toast} from "react-toastify"
import {RENEW_CONFIRAMTION} from "../graphql/mutations/user-mutations.js"
import {renewConfirmationSchema} from "@utterzone/common"

/* import gql from "graphql-tag" */
import {
  Container,
  Flex,
  FormikInput,
  LoadingButton,
  Section
} from "../components"

const styles = theme => ({
  button: {
    margin: "30px"
  },
  root: {
    backgroundColor: "black",
    height: "100%"
  },
  text: {
    color: "white"
  },
  textField: {
    margin: "18px",
    background: "white",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  section: {
    padding: theme.spacing.unit * 1,
    height: "100vh",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  }
})

class ConfirmEmail extends Component {
  state = {
    confirmation:
      "Did you lose your confirmation email?  We can send you another one."
  }

  componentDidMount = async () => {
    const apiUrl = process.env.API_URL
    console.log("api: ", apiUrl)
    console.log("props; ", this.props)
    /* if (process.env.NODE_ENV === "production") { */
    /*   fetch( */
    /*     `${apiUrl}:3010/api/users/confirm/${this.props.match.params.token}` */
    /*   ).then(async res => { */
    /*     this.setState({ */
    /*       confirmation: await res.text() */
    /*     }) */
    /*   }) */
    /* } else { */
    /*   fetch( */
    /*     `http://192.168.68.8:3010/api/users/confirm/${ */
    /*       this.props.match.params.token */
    /*     }` */
    /*   ).then(async res => { */
    /*     this.setState({ */
    /*       confirmation: await res.text() */
    /*     }) */
    /*   }) */
    /* } */
  }

  render() {
    const {classes} = this.props
    const {confirmation} = this.state
    return (
      <React.Fragment>
        <Container className={classes.root}>
          <Section className={classes.section}>
            <Formik
              validationSchema={renewConfirmationSchema}
              initialValues={{email: ""}}
              onSubmit={async (values, actions) => {
                const result = await this.props.client.mutate({
                  mutation: RENEW_CONFIRAMTION,
                  variables: {
                    email: values.email
                  }
                })

                if (result.data.errors) {
                  console.log("cat")
                  toast.error(result.data.errors[0].message, {
                    className: "toasty",
                    bodyClassName: "toasty-body",
                    hideProgressBar: true
                  })
                  actions.setSubmitting(false)
                  return
                }

                if (result.data.renewConfirmation) {
                  setTimeout(() => {
                    actions.setSubmitting(false)
                    toast.success("A confirmation email has been sent.", {
                      className: "toasty",
                      bodyClassName: "toasty-body",
                      hideProgressBar: true
                    })
                    actions.resetForm()
                  }, 3000)
                  return
                }

                toast.error("No email on file with that address.", {
                  className: "toasty",
                  bodyClassName: "toasty-body",
                  hideProgressBar: true
                })

                setTimeout(() => {
                  actions.setSubmitting(false)
                }, 3000)
              }}
              render={({errors, handleChange, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.text}
                    gutterBottom>
                    {confirmation}
                  </Typography>
                  <Flex flexdirection="row" justifycontent="center">
                    <Field
                      className={classes.textField}
                      name="email"
                      onChange={handleChange}
                      placeholder="email address"
                      component={FormikInput}
                    />
                    {errors.name && <div id="feedback">{errors.name}</div>}
                    <LoadingButton
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className={classes.button}
                      color="primary"
                      variant="contained"
                      type="submit">
                      Apply
                    </LoadingButton>
                  </Flex>
                </form>
              )}
            />
          </Section>
        </Container>
      </React.Fragment>
    )
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(ConfirmEmail)
