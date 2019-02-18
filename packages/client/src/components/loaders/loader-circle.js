import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import {withStyles} from "@material-ui/core/styles"

const styles = () => ({
  progress: {
    color: "rgba(0, 0, 0, 0.5)"
  }
})

const loaderCircle = ({classes}) => (
  <CircularProgress className={classes.progress} />
)

export default withStyles(styles)(loaderCircle)
