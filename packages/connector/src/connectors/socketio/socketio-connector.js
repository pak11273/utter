/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import SocketIOInstance from "../../services/socketio"
import {normalizeErrors} from "../../utils/normalize-errors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */

const socket = new SocketIOInstance()

export class SocketIOInitialConnector extends PureComponent {
  connect = () => {
    return new Promise(resolve => {
      socket.on("connect", () => {
        resolve(socket)
      })
    })
  }

  render() {
    //TODO: redux the promise
    const socketio = this.connect().then(data =>
      console.log("socket: ", socket)
    )
    return this.props.children({submit: this.submit})
  }
}
