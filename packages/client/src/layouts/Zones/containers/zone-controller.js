import React, {PureComponent} from "react"
import {ZoneCreateConnector} from "@utterzone/connector"

import ZoneCreate from "./zone-create.js"

export default class ZoneCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <ZoneCreateConnector>
          {({submit}) => <ZoneCreate submit={submit} />}
        </ZoneCreateConnector>
      </React.Fragment>
    )
  }
}
