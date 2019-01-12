import React, {PureComponent} from "react"
import {LevelsConnector} from "@utterzone/connector"

import LevelsEdit from "./levels-edit.js"

export default class LevelsCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <LevelsConnector>
          {({submit}) => <LevelsEdit submit={submit} />}
        </LevelsConnector>
      </React.Fragment>
    )
  }
}
