import React from "react"
import {session} from "brownies"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import StripeCheckout from "react-stripe-checkout"
import {Mutation} from "react-apollo"
import {CREATE_PAY_MONTHLY} from "../../../graphql/mutations/account-mutations.js"

// TODO get this to work
// iscanceld to false
// roles add payMonthly
// update session

export const ReactivateAccount = () => (
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
                Reactive your account
              </Typography>
              <StripeCheckout
                label="Reactivate"
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
