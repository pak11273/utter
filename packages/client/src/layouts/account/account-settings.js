import React from "react"
import {Mutation} from "react-apollo"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import {cookies, session} from "brownies"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {styles} from "./styles.js"
import {CANCEL_PAY_MONTHLY} from "../../graphql/mutations/account-mutations.js"

function AccountSettings(props) {
  const {classes} = props

  console.log("props: ", props)
  const cancel = mutate => () => {
    mutate()
    var temp = session.user
    const filtered = session.user.roles.filter(val => {
      return val !== "payMonthly"
    })
    temp.isCanceled = true
    temp.roles = filtered
    session.user = temp

    delete cookies._uid
    delete session.user
    props.history.push("/login", {
      notification: "Your account has been deactivated",
      type: "success"
    })
  }

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
              Account Settings
            </Typography>
            <div className={classes.heroButtons} />
          </div>
        </div>
        {session.user.isCanceled === false && (
          <div>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph>
              Your account will be deactivated. You
              will not be able to login with your current credentials.
            </Typography>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Mutation mutation={CANCEL_PAY_MONTHLY}>
                  {mutate => {
                    return (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={cancel(mutate)}>
                        Cancel My Account
                      </Button>
                    )
                  }}
                </Mutation>
              </Grid>
            </Grid>
          </div>
        )}
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(AccountSettings)
