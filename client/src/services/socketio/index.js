import io from 'socket.io-client'

class Socket {
  connect() {
    this.socket = io()
    const socket = this.socket
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
    })
  }

  getRooms() {
    return new Promise((resolve, reject) => {
      this.nsp.emit('get rooms')
      this.nsp.on('get rooms', list => {
        resolve(list)
      })
    })
  }

  createRoom(room) {
    return new Promise((resolve, reject) => {
      this.nsp.emit('create room', room)
    })
  }

  // io.of('/chat').in('general').clients((error, clients) => {
  //     if (error) throw error;

  // Returns an array of client IDs like ["Anw2LatarvGVVXEIAAAD"]
  //   console.log(clients);
  //   })

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
      if (!this.socket) return reject('No socket connection.')

      return this.socket.emit(event, data, response => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error)
          return reject(response.error)
        }

        return resolve()
      })
    })
  }

  on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.')

      this.socket.on(event, fun)
      resolve()
    })
  }
}

export default Socket
