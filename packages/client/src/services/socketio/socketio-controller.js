import React, {PureComponent} from "react"
/* import {SocketIOInitialConnector} from "@utterzone/connector" */

import Zone from "../../layouts/zones/containers/zone.js"

export default class SocketIOCtrl extends PureComponent {
  render() {
    return <Zone />
  }
}

/* <React.Fragment> */
/*   <SocketIOInitialConnector>{() => <Zone />}</SocketIOInitialConnector> */
/* </React.Fragment> */
