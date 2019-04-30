import React from "react"
/* import Button from "@material-ui/core/Button" */
/* import Grid from "@material-ui/core/Grid" */
import {session} from "brownies"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "./styles.js"

function AccountThanks(props) {
  const {classes} = props

  return (
    <React.Fragment>
      <main className={classes.settingsContent}>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            />
            <div className={classes.heroButtons} />
          </div>
        </div>
        {session.user.roles.includes("payMonthly") && (
          <div>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph>
              Thank you for your payment!
            </Typography>
            {/* TODO: info and link to get started  
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
									Get Started Guide
                </Button>
              </Grid>
            </Grid>
						*/}
          </div>
        )}
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(AccountThanks)
