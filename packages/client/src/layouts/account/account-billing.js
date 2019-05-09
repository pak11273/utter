import React, {PureComponent} from "react"
/* import {session} from "brownies" */
/* import Grid from "@material-ui/core/Grid" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "./styles.js"
/* import StripeCheckout from "react-stripe-checkout" */
/* import {Mutation} from "react-apollo" */

/* import {ChangeCreditCard} from "./components/change-credit-card.js" */
/* import {PayMonthly} from "./components/pay-monthly.js" */
/* import {ReactivateAccount} from "./components/reactivate-account.js" */

class AccountBilling extends PureComponent {
  render() {
    const {classes} = this.props

    /* let status */

    /* if (session.user.isCanceled) { */
    /*   status = <ReactivateAccount classes={classes} /> */
    /* } else if (!session.user.roles.includes("payMonthly")) { */
    /*   status = <PayMonthly classes={classes} /> */
    /* } else { */
    /*   status = <ChangeCreditCard classes={classes} /> */
    /* } */

    return (
      <React.Fragment>
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
          {/*
          {status}
					*/}
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AccountBilling)
