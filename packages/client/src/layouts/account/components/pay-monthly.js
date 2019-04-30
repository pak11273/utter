import React from "react"
import {session} from "brownies"
/* import CssBaseline from "@material-ui/core/CssBaseline" */
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
/* import {withStyles} from "@material-ui/core/styles" */
import StripeCheckout from "react-stripe-checkout"
import {Mutation} from "react-apollo"
/* import {styles} from "../styles.js" */
import {CREATE_PAY_MONTHLY} from "../../../graphql/mutations/account-mutations.js"

export const PayMonthly = () => (
  <Mutation mutation={CREATE_PAY_MONTHLY}>
    {mutate => {
      return (
        <Grid container spacing={16} justify="center">
          <Grid item>
            <React.Fragment>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph>
                Start your Free Trial!
              </Typography>
              <StripeCheckout
                amount={1200}
                image="https://www.gmkfreelogos.com/logos/D/img/DKP_-_uz-Logo.gif"
                /* image="https://st2.depositphotos.com/5943796/11454/v/950/depositphotos_114540072-stock-illustration-initial-letter-uz-red-swoosh.jpg" */
                token={async token => {
                  const response = await mutate({
                    variables: {source: token.id, ccLast4: token.card.last4}
                  })
                  // update session
                  var {user} = session
                  user.roles = response.data.createPayMonthly.roles
                  user.ccLast4 = response.data.createPayMonthly.ccLast4
                  session.user = user
                  window.location = "./account-thanks"
                }}
                stripeKey={process.env.STRIPE_PUBLISHABLE}
              />
            </React.Fragment>
          </Grid>
        </Grid>
      )
    }}
  </Mutation>
)
