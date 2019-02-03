import {takeEvery, call, take, put} from "redux-saga/effects"
import {eventChannel} from "redux-saga"

import {ADD_MESSAGE, MESSAGE_FROM_CLIENT} from "./types"

function socketSendMessage(socket, action) {
  return new Promise((resolve, reject) => {
    try {
      socket.send(JSON.stringify(action))
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

export function* sendNewMessSage(socket, username, action) {
  try {
    const actionToSocket = {
      ...action,
      type: MESSAGE_FROM_CLIENT,
      author: username
    }
    yield call(socketSendMessage, socket, actionToSocket)
  } catch (error) {
    console.log(error) // TODO: need better error handler
  }
}

export function* watchSendMessageSaga(socket, username) {
  yield takeEvery(ADD_MESSAGE, sendNewMessSage, socket, username)
}

function createSocketChannel(socket) {
  return eventChannel(emit => {
    const errorHandler = error => {
      emit(new Error(error))
    }

    const messageHandler = message => {
      emit(JSON.parse(message))
    }

    socket.on("error", errorHandler)
    socket.on("message", messageHandler)
    const unsubscribe = () => {
      socket.off("message", messageHandler)
    }
    return unsubscribe
  })
}

export function* watchOnPings(socket) {
  const socketChannel = yield call(createSocketChannel, socket)

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const {type, ...payload} = yield take(socketChannel)
      yield put({type, ...payload})
    } catch (err) {
      socketChannel.close()
    }
  }
}

export default function getSagas(config) {
  const {socket, username} = config
  return [watchSendMessageSaga(socket, username), watchOnPings(socket)]
}
