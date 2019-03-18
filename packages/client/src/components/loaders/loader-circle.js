import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import {withStyles} from "@material-ui/core/styles"

const styles = () => ({
  progress: {
    color: "rgba(0, 0, 0, 0.5)"
  }
})

const loaderCircle = ({classes}) => (
  <div style={{display: "flex"}}>
    <CircularProgress className={classes.progress} />
  </div>
)

export default withStyles(styles)(loaderCircle)
