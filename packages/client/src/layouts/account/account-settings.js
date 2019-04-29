import React from "react"
/* import classNames from "classnames" */
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {styles} from "./styles.js"

function AccountSettings(props) {
  const {classes} = props

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
              Account Settings
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph>
              Aenean vulputate eleifend tellus. Vestibulum dapibus nunc ac
              augue. Donec venenatis vulputate lorem. Quisque rutrum.
              Pellentesque auctor neque nec urna.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div>
          <h5>under construction</h5>
        </div>
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(AccountSettings)
