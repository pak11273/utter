import React, {Component} from "react"
import {Helmet} from "react-helmet-async"
import {compose, withApollo} from "react-apollo"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import gql from "graphql-tag" */
import {Container, Section} from "../components"

const styles = theme => ({
  root: {
    backgroundColor: "black",
    height: "100%"
  },
  text: {
    color: "white"
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
    confirmation: ""
  }

  componentDidMount = async () => {
    const apiUrl = process.env.API_URL
    if (process.env.NODE_ENV === "production") {
      const controller = new AbortController()
      const signal = controller.signal

      const fetchPromise = fetch(
        `${apiUrl}/api/users/confirm/${this.props.match.params.token}`
      )

      // 5 second timeout:
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      fetchPromise.then(async res => {
        // completed request before timeout fired
        this.setState({
          confirmation: await res.text()
        })

        // If you only wanted to timeout the request, not the response, add:
        clearTimeout(timeoutId)
      })
    } else {
      fetch(
        `http://192.168.68.8:3010/api/users/confirm/${
          this.props.match.params.token
        }`
      ).then(async res => {
        this.setState({
          confirmation: await res.text()
        })
      })
    }
  }

  render() {
    const {classes} = this.props
    const {confirmation} = this.state
    /* Your email account has been confirmed. */
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Confirm Email</title>
          <link rel="canonical" href="https://utterzone/confirm-email" />
        </Helmet>
        <Container className={classes.root}>
          <Section className={classes.section}>
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              gutterBottom>
              {confirmation}
            </Typography>
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
