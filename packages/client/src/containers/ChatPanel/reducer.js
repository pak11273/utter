import {SET_AUTHOR} from './types.js'

// The initial state of the App
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHOR:
      return {
        ...state,
        author: action.payload
      }
    default:
      return state
  }
}

// import {
//   ADD_MESSAGE_FULFILLED,
//   SET_AUTHOR,
//   SET_FINAL_TRANSCRIPT_FULFILLED,
//   SET_INTERIM_SCRIPT_FULFILLED,
//   UPDATE_MESSAGES_FULFILLED
// } from './types.js'

// // The initial state of the App
// const initialState = {
//   author: '',
//   message: '',
//   messageList: [],
//   interim_letter: '',
//   interim_script: '',
//   final_transcript: ''
// }

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_MESSAGE_FULFILLED:
//       return {
//         ...state,
//         message: action.payload
//       }
//     case UPDATE_MESSAGES_FULFILLED:
//       return {
//         ...state,
//         messageList: [...state.messageList, action.payload]
//       }
//     case SET_FINAL_TRANSCRIPT_FULFILLED:
//       return {
//         ...state,
//         final_transcript: action.payload
//       }
//     case SET_INTERIM_SCRIPT_FULFILLED:
//       return {
//         ...state,
//         interim_script: action.payload
//       }
//     case SET_AUTHOR:
//       return {
//         ...state,
//         author: action.payload
//       }
//     default:
//       return state
//   }
// }
