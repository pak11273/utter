import React, {PureComponent} from "react"
import {LevelsConnector} from "@utterzone/connector"

import LevelsView from "./levels-edit.js"

export default class LevelsCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <LevelsConnector>
          {({submit}) => <LevelsView submit={submit} />}
        </LevelsConnector>
      </React.Fragment>
    )
  }
}
