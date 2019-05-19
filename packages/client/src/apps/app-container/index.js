import React, {PureComponent} from "react"

import {Flex} from "../../components"

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
      <Flex >
        <GetCarousel />
      </Flex>
    )
  }
}

export default AppContainer
