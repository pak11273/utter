import React, {PureComponent} from "react"
/* import BrainStorm from "../brainstorm" */

import Grid from "@material-ui/core/Grid"
/* import {withStyles} from "@material-ui/core/styles" */

import Loadable from "react-loadable"
import Loading from "../../components/loaders/layout-loader.js"

const GetBrainStorm = Loadable({
  loader: () => import("../brainstorm"),
  loading: Loading
})

class AppContainer extends PureComponent {
  componentDidMount() {
    // get app info from redux and load app here
  }

  render() {
    return (
      <Grid align="center">
        <GetBrainStorm />
      </Grid>
    )
  }
}

export default AppContainer
