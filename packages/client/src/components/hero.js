import React, {PureComponent} from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
})

class Hero extends PureComponent {
  render() {
    const {classes, title} = this.props
    return (
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Grid container justify="center" direction="column">
            <Typography variant="h4" align="center" gutterBottom>
              {title}
            </Typography>
			{this.props.children}
          </Grid>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(Hero)
