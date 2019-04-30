import React, {PureComponent} from "react"
import {session} from "brownies"
import CssBaseline from "@material-ui/core/CssBaseline"
/* import Grid from "@material-ui/core/Grid" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "./styles.js"
/* import StripeCheckout from "react-stripe-checkout" */
/* import {Mutation} from "react-apollo" */

import {ChangeCreditCard} from "./components/change-credit-card.js"
import {PayMonthly} from "./components/pay-monthly.js"

class AccountBilling extends PureComponent {
  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.settingsContent}>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                Billing
              </Typography>
              <div className={classes.heroButtons} />
            </div>
          </div>
          {!session.user.roles.includes("payMonthly") ? (
            <PayMonthly classes={classes} />
          ) : (
            <ChangeCreditCard classes={classes} />
          )}
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AccountBilling)
