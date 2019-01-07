import React, {PureComponent} from "react"
import {ZoneCreateConnector} from "@utterzone/connector"

import ZonesCreate from "./zones-create.js"

export default class ZoneCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <ZoneCreateConnector>
          {({submit}) => <ZonesCreate submit={submit} />}
        </ZoneCreateConnector>
      </React.Fragment>
    )
  }
}
