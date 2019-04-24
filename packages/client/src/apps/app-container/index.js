import React, {PureComponent} from "react"

import Grid from "@material-ui/core/Grid"

import Loadable from "react-loadable"
import Loading from "../../components/loaders/layout-loader.js"

const GetCarousel = Loadable({
  loader: () => import("../carousel"),
  loading: Loading
})

class AppContainer extends PureComponent {
  componentDidMount() {
    // get app info and load app here
  }

  render() {
    return (
      <Grid align="center">
        <GetCarousel />
      </Grid>
    )
  }
}

export default AppContainer
