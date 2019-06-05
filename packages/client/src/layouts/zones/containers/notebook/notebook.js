import React, {PureComponent} from "react"

import Grid from "@material-ui/core/Grid"
/* import Paper from "@material-ui/core/Paper" */
/* import Typography from "@material-ui/core/Typography" */
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    backgroundColor: "white",
    height: "100%",
    minHeight: "900px",
    width: "100%"
  },
  paper: {
    textAlign: "left",
    color: theme.palette.text.primary
  },
  title: {
    padding: "50px"
  }
})

class Notebook extends PureComponent {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid align="center">
          {/* <Typography align="center" variant="h4" className={classes.title}>
            Notebook
          </Typography> */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Notebook)
