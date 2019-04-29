import React, {Component} from "react"
import StripeCheckout from "react-stripe-checkout"
/* import {withRouter} from "react-router-dom" */
import {Mutation} from "react-apollo"
/* import Grid from "@material-ui/core/Grid" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import gql from "graphql-tag"
import {session} from "brownies"
/* import {hasRole} from "../../utils/auth.js" */
/* import {toast} from "react-toastify" */

/* import {Field, withFormik} from "formik" */
/* import isEmpty from "lodash/isEmpty" */
/* import {courseCreateSchema} from "../yupSchemas.js" */
import /* FormikInput, */
/* FormikTextArea, */
/* Span, */
/* Img, */
/* LoadingButton, */
"../../components"

const CREATE_PAY_MONTHLY = gql`
  mutation createPayMonthly($source: String!) {
    createPayMonthly(source: $source) {
      _id
      email
      roles
    }
  }
`
const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  heading: {
    color: "black"
  },
  heroUnit: {
    backgroundColor: "#2bae3a"
  },
  heroContent: {
    maxWidth: 960,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  root: {
    maxWidth: 960,
    margin: "0 auto"
  },
  subHeading: {
    color: "black",
    marginTop: "40px",
    position: "relative"
  }
})

class AccountBilling extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Mutation mutation={CREATE_PAY_MONTHLY}>
          {mutate => {
            return (
              <div className={classes.root}>
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.heading}
                  gutterBottom>
                  Billing
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Start Subscribing
                </Typography>
                {/* {hasRole(session.user, ["payMonthly"]) && ( */}
                <StripeCheckout
                  image="https://www.gmkfreelogos.com/logos/D/img/DKP_-_uz-Logo.gif"
                  /* image="https://st2.depositphotos.com/5943796/11454/v/950/depositphotos_114540072-stock-illustration-initial-letter-uz-red-swoosh.jpg" */
                  token={async token => {
                    const response = await mutate({
                      variables: {source: token.id}
                    })
                    // update session
                    var {user} = session
                    user.roles = response.data.createPayMonthly.roles
                    session.user = user
                  }}
                  stripeKey={process.env.STRIPE_PUBLISHABLE}
                />
                {/* )} */}
              </div>
            )
          }}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AccountBilling)
