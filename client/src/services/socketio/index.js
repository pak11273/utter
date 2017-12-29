import io from 'socket.io-client'
import store from '../../store.js'

import {
  receiveAudioBlob,
  receiveMsg,
  receiveRoomMeta
} from '../socketio/actions.js'

class Socket {
  constructor(opts) {
    this.opts = {autoUpgrade: false, peerOpts: {numClients: 10}}
  }
  connect() {
    this.socket = io()
    return new Promise((resolve, reject) => {
      this.socket.on('connection', nsp => {
        // return state of socket in redux
        resolve(nsp)
      })
      this.socket.on('connect_error', error => reject(error))
    })
  }

  nspConnect(namespace) {
    return new Promise((resolve, reject) => {
      this.nsp = io(`/${namespace}`)
      this.nsp.on('connection', nsp => {
        // return state of socket in redux
        resolve({nsp, socket})
      })

      this.nsp.on('connect_error', error => reject(error))

      this.nsp.on('receive audio blob', blob => {
        store.dispatch(receiveAudioBlob(blob))
      })

      this.nsp.on('receive room meta', meta => {
        store.dispatch(receiveRoomMeta(meta))
      })

      this.nsp.on('receive msg', msg => {
        store.dispatch(receiveMsg(msg))
      })
    })
  }

  disconnect() {
    return new Promise(resolve => {
      this.socket.disconnect(() => {
        this.socket.on('disconnect', () => {
          resolve()
        })
      })
    })
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.nsp || !this.socket) return reject('No socket connection')

      if (this.nsp) {
        return this.nsp.emit(event, data, response => {
          if (response.error) {
            console.error(response.error)
            return reject(response.error)
          }
          return resolve(response)
        })
      } else if (this.socket) {
        return socket.emit(event, data, response => {
          if (response.error) {
            console.error(response.error)
            return reject(response.error)
          }
          return resolve(response)
        })
      }
    })
  }

  on(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.nsp || !this.socket) return reject('No socket connection')

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

export default Socket
