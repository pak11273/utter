import React, {PureComponent} from "react"
import {session} from "brownies"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "./styles.js"
import StripeCheckout from "react-stripe-checkout"
import {Mutation} from "react-apollo"

import {CREATE_PAY_MONTHLY} from "./xhr.js"

class AccountBilling extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <Mutation mutation={CREATE_PAY_MONTHLY}>
          {mutate => {
            return (
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
                    <div className={classes.heroButtons}>
                      <Grid container spacing={16} justify="center">
                        <Grid item>
                          {!session.user.roles.includes("payMonthly") && (
                            <React.Fragment>
                              <Typography
                                variant="h6"
                                align="center"
                                color="textSecondary"
                                paragraph>
                                Start your Free Trial!
                              </Typography>
                              <StripeCheckout
                                image="https://www.gmkfreelogos.com/logos/D/img/DKP_-_uz-Logo.gif"
                                /* image="https://st2.depositphotos.com/5943796/11454/v/950/depositphotos_114540072-stock-illustration-initial-letter-uz-red-swoosh.jpg" */
                                token={async token => {
                                  const response = await mutate({
                                    variables: {source: token.id}
                                  })
                                  // update session
                                  var {user} = session
                                  user.roles =
                                    response.data.createPayMonthly.roles
                                  session.user = user
                                  window.location = "./account-thanks"
                                }}
                                stripeKey={process.env.STRIPE_PUBLISHABLE}
                              />
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div>
                  <h6 style={{display: "none"}}>TODO</h6>
                </div>
              </main>
            )
          }}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(AccountBilling)
