/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
/* import {SocketIO} from "../../services/socketio" */
import {normalizeErrors} from "../../utils/normalizeErrors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class SocketIOInitialConnector extends PureComponent {
  /* socket.on('news', function (data) { */
  /* console.log(data); */
  /* socket.emit('my other event', { my: 'data' }); */
  /* }); */

  /* socketio.emit("createMessage", { */
  /* 	text: "wtf homie foo" */
  /* }) */

  connect = () => {
    /* const socket = SocketIO("http://localhost:3000") */
    return new Promise(resolve => {
      socket.on("connect", () => {
        resolve(socket)
      })
    })
  }

  submit = async values => {
    try {
      /* socket emit */
      /* socketio => { */
      /*   socketio.on("connection", socket => { */
      /*     console.log("User connected") */

      if (courseCreate) {
        return courseCreate
      }
      if (error) {
        return normalizeErrors(error)
      }
    } catch (err) {
      console.log("err: ", err)
    }
    return null
  }

  render() {
    /* const socketio = this.connect() */
    return this.props.children({submit: this.submit})
  }
}
