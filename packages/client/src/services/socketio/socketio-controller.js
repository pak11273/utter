import React, {PureComponent} from "react"
import {SocketIOInitialConnector} from "@utterzone/connector"

import Zone from "../../layouts/Zones/containers/zone.js"

export default class SocketIOCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <SocketIOInitialConnector>
          {({submit}) => <Zone submit={submit} />}
        </SocketIOInitialConnector>
      </React.Fragment>
    )
  }
}
