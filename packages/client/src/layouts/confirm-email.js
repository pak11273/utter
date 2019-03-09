import React, {Component} from "react"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {Container, Section} from "../components"
/* import {Masthead} from "../containers" */

// actions
import {toggleFooter} from "../core/actions/toggle-footer-action.js"

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
    margin: "0 auto 100px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  }
})

class ConfirmEmail extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {classes} = this.props
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
          <link rel="canonical" href="https://utter.zone/confirm-email" />
        </Helmet>
        <Container className={classes.root}>
          <Section className={classes.section}>
            <Typography
              variant="h4"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              Your email account has been confirmed.
            </Typography>
          </Section>
        </Container>
      </React.Fragment>
    )
  }
}

const actions = {
  toggleFooter
}

export default connect(
  null,
  actions
)(withStyles(styles)(ConfirmEmail))
