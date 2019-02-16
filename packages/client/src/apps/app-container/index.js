import React, {PureComponent} from "react"
import BrainStorm from "../brainstorm"

import Grid from "@material-ui/core/Grid"
/* import {withStyles} from "@material-ui/core/styles" */

// TODO implement loadable for apps
/* import Loadable from "react-loadable" */
/* import Loading from "../../components/loaders/layout-loader.js" */

/* const getBrainStorm = Loadable({ */
/*   loader: () => import("../brainstorm"), */
/*   loading: Loading */
/* }) */

class AppContainer extends PureComponent {
  componentDidMount() {
    // get app info from redux and load app here
  }

  render() {
    return (
      <Grid align="center">
        <BrainStorm />
      </Grid>
    )
  }
}

export default AppContainer
