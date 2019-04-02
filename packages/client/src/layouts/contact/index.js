import React, {Component} from "react"
import {Helmet} from "react-helmet-async"
import ContactForm from "../../containers/forms/contact_form/contact-form"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import {Container} from "../../components" */
import {Footer} from "../../containers"

const styles = theme => ({
  root: {
    backgroundColor: "rgb(27,28,29)",
    height: "600px"
  },
  text: {
    color: "white",
    maxWidth: "900px"
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
          <meta
            name="description"
            content="Make direct contact with our team through our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <Grid container>
          <Grid
            item
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: "100%"
            }}
            className={classes.root}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}>
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
                Make direct contact with our team through our contact
                information form. We will do our best to respond in a timely
                manner. If you are a business or educational institution, this
                would be a good place to shoot a short inquiry.
              </Typography>
            </div>
          </Grid>
          <Grid item style={{padding: "100px", width: "100%"}}>
            <Typography component="h1" variant="h4" align="center">
              Request Information
            </Typography>
            <ContactForm />
          </Grid>
          <Grid item style={{width: "100%"}}>
            <Footer />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Contact)
