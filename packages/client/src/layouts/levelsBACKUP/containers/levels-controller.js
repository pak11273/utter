import React, {PureComponent} from "react"
import {LevelsConnector} from "@utterzone/connector"

import LevelsUpdate from "./levels-update.js"

export default class LevelsCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <LevelsConnector>
          {({submit}) => <LevelsUpdate submit={submit} />}
        </LevelsConnector>
      </React.Fragment>
    )
  }
}
