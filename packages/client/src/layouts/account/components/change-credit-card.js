import React from "react"
import {session} from "brownies"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {LoaderCircle} from "../../../components"
/* import {withStyles} from "@material-ui/core/styles" */
import StripeCheckout from "react-stripe-checkout"
import {Mutation, Query} from "react-apollo"
/* import {styles} from "../styles.js" */
import {CHANGE_CREDIT_CARD} from "../../../graphql/mutations/account-mutations.js"
import {ME_QUERY} from "../../../graphql/queries/user-queries.js"

export const ChangeCreditCard = () => {
  const onClose = () => {
    window.location.reload(true)
  }
  return (
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
                {/* TODO: update cache when changing cc, instead of reloading page */}
                <Query query={ME_QUERY}>
                  {(data, loading) => {
                    if (loading) {
                      return <LoaderCircle />
                    }
                    if (data.data && data.data.me) {
                      return (
                        <Typography
                          variant="h6"
                          align="center"
                          color="textPrimary"
                          gutterBottom>
                          xxxx-xxxx-xxxx-
                          {data.data.me.ccLast4}
                        </Typography>
                      )
                    }
                    return null
                  }}
                </Query>
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
              <Grid item style={{margin: "0 auto"}}>
                <div>
                  <StripeCheckout
                    closed={onClose}
                    ComponentClass="utter"
                    label="Change Credit Card"
                    panelLabel="Change"
                    image="https://www.gmkfreelogos.com/logos/D/img/DKP_-_uz-Logo.gif"
                    /* image="https://st2.depositphotos.com/5943796/11454/v/950/depositphotos_114540072-stock-illustration-initial-letter-uz-red-swoosh.jpg" */
                    token={async token => {
                      const response = await mutate({
                        variables: {source: token.id, ccLast4: token.card.last4}
                      })
                      // update session
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
}
