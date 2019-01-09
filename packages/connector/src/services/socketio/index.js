import socketio from "socket.io-client"
import {store} from "../../../../client/src/store.js"

import {
  receiveAudioBlob,
  receiveMsg,
  receiveRoomMeta
} from "../../../../client/src/services/socketio/actions.js"

class SocketIO {
  constructor() {
    this.opts = {autoUpgrade: false, peerOpts: {numClients: 10}}

    connect: new Promise((resolve, reject) => {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "prod"
      ) {
        this.socket = socketio.connect(process.env.SOCKETIO_SERVER_URL)
      } else {
        this.socket = socketio.connect("http://192.168.68.8:3010")
      }

      this.socket.on("connect", nsp => {
        // return state of socket in redux
        console.log("hello foo", nsp)
        resolve(nsp)
      })
      this.socket.on("connect_error", error => reject(error))
    })

    /* this.socket.on("connect_error", error => reject(error)) */
    /* }) */
  }

  nspConnect(namespace) {
    return new Promise((resolve, reject) => {
      this.nsp = socketio(`/${namespace}`)
      this.nsp.on("connection", nsp => {
        // return state of socket in redux
        resolve({nsp})
      })

      this.nsp.on("connect_error", error => reject(error))

      this.nsp.on("receive audio blob", blob => {
        store.dispatch(receiveAudioBlob(blob))
      })

      this.nsp.on("receive room meta", meta => {
        store.dispatch(receiveRoomMeta(meta))
      })

      this.nsp.on("receive msg", msg => {
        store.dispatch(receiveMsg(msg))
      })
    })
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket.on("disconnect", () => {
          resolve()
        })
      })
    })
  }

  emit(event, data) {
    return new Promise(resolve => {
      /* if (!this.nsp || !this.socket) return reject("No socket connection") */

      if (this.nsp) {
        console.log("nah")
        return this.nsp.emit(event, data, response => {
          if (response.error) {
            console.error(response.error)
            return response.error
          }
          return resolve(response)
        })
      }
      if (this.socket) {
        console.log("wtf")
        return this.socket.emit(event, data, response => {
          if (response.error) {
            console.error(response.error)
            return response.error
          }
          return resolve(response)
        })
      }
    })
  }

  on(event, data) {
    return new Promise(resolve => {
      if (this.nsp) {
        this.nsp.on(event, data)
        resolve(data)
      } else if (this.socket) {
        this.socket.on(event, data)
        resolve()
      }
    })
  }

  // on(event, fun) {
  //   // No promise is needed here, but we're expecting one in the middleware.
  //   return new Promise((resolve, reject) => {
  //     if (!this.socket) return reject('No socket connection.')

  //     this.socket.on(event, fun)
  //     resolve()
  //   })
  // }
}

export default SocketIO
