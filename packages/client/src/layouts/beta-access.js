import React, {Component} from "react"
import {compose, withApollo} from "react-apollo"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Formik} from "formik"

/* import gql from "graphql-tag" */
import {Container, Flex, Section} from "../components"

const styles = theme => ({
  application: {
    color: "yellow"
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

class BetaAccess extends Component {
  state = {
    confirmation:
      "Enter your beta key. Once your key has been verified you will then be able to sign up."
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
              initialValues={{name: ""}}
              onSubmit={(values, actions) => {
                // validationSchema: ??
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
                // TODO
                /* Your email account has been confirmed. */
              }}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <Typography
                    variant="h4"
                    align="center"
                    className={classes.text}
                    gutterBottom>
                    {confirmation}
                  </Typography>
                  <Flex flexdirection="row" justifycontent="center">
                    <TextField
                      id="outlined-name"
                      label="Enter key"
                      onChange={props.handleChange}
                      value={props.values.name}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    {props.errors.name && (
                      <div id="feedback">{props.errors.name}</div>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}>
                      Submit
                    </Button>
                  </Flex>
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.text}
                    style={{marginTop: "100px"}}
                    gutterBottom>
                    If you haven&apos;t applied for beta yet you can do so{" "}
                    <Button
                      className={classes.application}
                      onClick={() => this.props.history.push("/application")}>
                      here
                    </Button>
                  </Typography>
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
)(BetaAccess)
