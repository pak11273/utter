import io from "socket.io-client"
/* import {store} from "../../store.js" */

/* import {receiveAudioBlob, receiveMsg, receiveRoomMeta} from "./actions.js" */

/* class Socket { */
/*   constructor() { */
/*     this.opts = {autoUpgrade: false, peerOpts: {numClients: 10}} */
/*   } */
console.log("IM FREE")

var url = ""
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod")
  url = process.env.SOCKETIO_SERVER_URL
else url = "http://192.168.68.8:3010"

const socketio = io(url)

export default socketio

/* connect() { */
/* if ( */
/*   process.env.NODE_ENV === "production" || */
/*   process.env.NODE_ENV === "prod" */
/* ) { */
/*   this.socket = socketio.connect(process.env.SOCKETIO_SERVER_URL) */
/* } else { */
/*   this.socket = socketio.connect("http://192.168.68.8:3010") */
/* } */

/* return new Promise((resolve, reject) => { */
/*   /1* this.socket.on("connection", nsp => { *1/ */
/*   this.socket.on("connect", nsp => { */
/*     // return state of socket in redux */
/*     console.log("hello foo", nsp) */
/*     resolve(nsp) */
/*   }) */
/*   this.socket.on("connect_error", error => reject(error)) */
/* }) */

/* return this.socket.on("connect", async nsp => { */
/*   await nsp */
/*   console.log("hello foo", nsp) */
/* }) */

/* /1* this.socket.on("connect_error", error => reject(error)) *1/ */
/* /1* }) *1/ */
/* } */

/* nspConnect(namespace) { */
/* return new Promise((resolve, reject) => { */
/*   this.nsp = socketio(`/${namespace}`) */
/*   this.nsp.on("connection", nsp => { */
/*     // return state of socket in redux */
/*     resolve({nsp}) */
/*   }) */

/*   this.nsp.on("connect_error", error => reject(error)) */

/*   this.nsp.on("receive audio blob", blob => { */
/*     store.dispatch(receiveAudioBlob(blob)) */
/*   }) */

/*   this.nsp.on("receive room meta", meta => { */
/*     store.dispatch(receiveRoomMeta(meta)) */
/*   }) */

/*   this.nsp.on("receive msg", msg => { */
/*     store.dispatch(receiveMsg(msg)) */
/*   }) */
/* }) */
/* } */

/* disconnect() { */
/* return new Promise(resolve => { */
/*   this.socket.disconnect(() => { */
/*     this.socket.on("disconnect", () => { */
/*       resolve() */
/*     }) */
/*   }) */
/* }) */
/* } */

/* emit(event, data) { */
/* return new Promise(resolve => { */
/*   /1* if (!this.nsp || !this.socket) return reject("No socket connection") *1/ */

/*   if (this.nsp) { */
/*     console.log("nah") */
/*     return this.nsp.emit(event, data, response => { */
/*       if (response.error) { */
/*         console.error(response.error) */
/*         return response.error */
/*       } */
/*       return resolve(response) */
/*     }) */
/*   } */
/*   if (this.socket) { */
/*     console.log("wtf") */
/*     return this.socket.emit(event, data, response => { */
/*       if (response.error) { */
/*         console.error(response.error) */
/*         return response.error */
/*       } */
/*       return resolve(response) */
/*     }) */
/*   } */
/* }) */
/* } */

/* on(event, data) { */
/* return new Promise(resolve => { */
/*   if (this.nsp) { */
/*     this.nsp.on(event, data) */
/*     resolve(data) */
/*   } else if (this.socket) { */
/*     this.socket.on(event, data) */
/*     resolve() */
/*   } */
/* }) */
/* } */

/* // on(event, fun) { */
/* //   // No promise is needed here, but we're expecting one in the middleware. */
/* //   return new Promise((resolve, reject) => { */
/* //     if (!this.socket) return reject('No socket connection.') */

/* //     this.socket.on(event, fun) */
/* //     resolve() */
/* //   }) */
/* // } */
/* } */

/* export default Socket */
