import React from "react"
import {session} from "brownies"
/* import CssBaseline from "@material-ui/core/CssBaseline" */
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
/* import {withStyles} from "@material-ui/core/styles" */
import StripeCheckout from "react-stripe-checkout"
import {Mutation} from "react-apollo"
/* import {styles} from "../styles.js" */
import {CHANGE_CREDIT_CARD} from "../xhr.js"

export const ChangeCreditCard = () => (
  <Mutation mutation={CHANGE_CREDIT_CARD}>
    {mutate => {
      return (
        <div>
          <Grid container spacing={16} justify="center" direction="column">
            <Grid item>
              <Typography
                variant="h6"
                align="center"
                color="textPrimary"
                gutterBottom>
                Current Credit Card Number
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textPrimary"
                gutterBottom>
                {session.user.ccLast4}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                align="center"
                color="textPrimary"
                gutterBottom>
                Change Credit Card
              </Typography>
            </Grid>
            <Grid item>
              <div style={{margin: "0 auto"}}>
                <StripeCheckout
                  image="https://www.gmkfreelogos.com/logos/D/img/DKP_-_uz-Logo.gif"
                  /* image="https://st2.depositphotos.com/5943796/11454/v/950/depositphotos_114540072-stock-illustration-initial-letter-uz-red-swoosh.jpg" */
                  token={async token => {
                    const response = await mutate({
                      variables: {source: token.id, ccLast4: token.card.last4}
                    })
                    // update session
                    console.log("response: ", response)
                    var {user} = session
                    user.ccLast4 = response.data.changeCreditCard.ccLast4
                    session.user = user
                    // TODO: toastify response
                  }}
                  stripeKey={process.env.STRIPE_PUBLISHABLE}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      )
    }}
  </Mutation>
)
