import React, {Component} from "react"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
import ContactForm from "../../containers/forms/contact_form/contact-form"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Container} from "../../components"
/* import {Masthead} from "../../containers" */

// actions
import {contactmail} from "../../core/actions/contact-mail-actions"
import {toggleFooter} from "../../core/actions/toggle-footer-action.js"

const styles = theme => ({
  root: {
    backgroundColor: "rgb(27,28,29)",
    height: "600px"
  },
  text: {
    color: "white"
  },
  layout: {
    margin: "80px 0 200px 0"
  },
  masthead: {
    backgroundColor: "rgb(27,28,29)",
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  }
})

class Contact extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Container className={classes.root}>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
              name="description"
              content="Make direct contact with our team through our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Contacts</title>
            <link rel="canonical" href="https://utter.zone/contact" />
          </Helmet>
          <Grid container className={classes.masthead} justify="center">
            <Typography
              variant="h4"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              Make direct contact with our team through our contact information
              form. We will do our best to respond in a timely manner. If you
              are a business or educational institution, this would be a good
              place to shoot a short inquiry.
            </Typography>
          </Grid>
        </Container>
        <main className={classes.layout}>
          <Typography component="h1" variant="h4" align="center">
            Request Information
          </Typography>
          <ContactForm contactmail={contactmail} />
        </main>
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
)(withStyles(styles)(Contact))
