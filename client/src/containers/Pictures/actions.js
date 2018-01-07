import {
  LOAD_QUERY,
  LOAD_QUESTION,
  LOAD_WORD_LIST,
  LOAD_ORIGINAL_WORD_LIST,
  SEND_ROMANIZED,
  SEND_TRANSLATED,
  UPDATE_ORIGINAL_WORD_LIST,
  UPDATE_PICTURE,
  // UDPATE_QUERY,
  UPDATE_TRANSLATION,
  UPDATE_WORD_LIST,
  UPDATE_REVIEW_LIST
} from './types.js'

const loadOriginalWordList = list => {
  return {
    type: LOAD_ORIGINAL_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

const loadQuery = query => {
  return {
    type: LOAD_QUERY,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

const loadQuestion = question => {
  return {
    type: LOAD_QUESTION,
    payload: new Promise((resolve, reject) => {
      resolve(question)
    })
  }
}

const loadWordList = list => {
  return {
    type: LOAD_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

const sendRomanized = word => {
  return {
    type: SEND_ROMANIZED,
    payload: new Promise((resolve, reject) => {
      resolve(word)
    })
  }
}

const sendTranslated = query => {
  return {
    type: SEND_TRANSLATED,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

const updateOriginalWordList = list => {
  return {
    type: UPDATE_ORIGINAL_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

const updatePicture = src => {
  return {
    type: UPDATE_PICTURE,
    payload: new Promise((resolve, reject) => {
      resolve(src)
    })
  }
}

// const updateQuery = query => {
//   return {
//     type: UPDATE_QUERY,
//     payload: new Promise((resolve, reject) => {
//       resolve(query)
//     })
//   }
// }

const updateReviewList = query => {
  return {
    type: UPDATE_REVIEW_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

const updateTranslation = translation => {
  return {
    type: UPDATE_TRANSLATION,
    payload: new Promise((resolve, reject) => {
      resolve(translation)
    })
  }
}

const updateWordList = list => {
  return {
    type: UPDATE_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

export {
  loadQuery,
  loadQuestion,
  loadOriginalWordList,
  loadWordList,
  updateOriginalWordList,
  updatePicture,
  // updateQuery,
  updateTranslation,
  updateWordList,
  updateReviewList,
  sendRomanized,
  sendTranslated
}
