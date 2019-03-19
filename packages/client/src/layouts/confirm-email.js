import React, {Component} from "react"
import {Helmet} from "react-helmet"
import {compose, withApollo} from "react-apollo"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import gql from "graphql-tag" */
import {Container, Section} from "../components"

/* const CONFIRM_EMAIL = gql` */
/* 	mutation confirmEmail($token: String) { */
/* 		confirmEmai(token: $token) { */
/* 		} */
/* 	} */
/* ` */

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
  componentDidMount = async () => {
    /* const result = await this.props.client.mutate({ */
    /*   mutation: CONFIRM_EMAIL, */
    /*   variables: { */
    /*     token: this.props.match.params.token */
    /*   } */
    /* }) */
    /* if (result) { */
    /*   if (result.data.confirmEmail > 0) { */
    /*     console.log("result: ", result) */
    /*   } */
    /* } */
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
          <link rel="canonical" href="https://utterzone/confirm-email" />
        </Helmet>
        <Container className={classes.root}>
          <Section className={classes.section}>
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              gutterBottom>
              Your email account has been confirmed.
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
