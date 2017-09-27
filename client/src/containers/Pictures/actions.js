import {
  LOAD,
  LOAD_QUERY,
  LOAD_WORD_LIST,
  LOAD_ORIGINAL_WORD_LIST,
  UPDATE_ORIGINAL_WORD_LIST,
  UPDATE_WORD_LIST,
  UPDATE_REVIEW_LIST,
  SEND_ROMANIZED,
  SEND_TRANSLATED
} from './types.js'

const loadPicture = obj => {
  return {
    type: LOAD,
    payload: new Promise((resolve, reject) => {
      resolve(obj)
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

const loadWordList = list => {
  return {
    type: LOAD_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

const loadOriginalWordList = list => {
  return {
    type: LOAD_ORIGINAL_WORD_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
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

const updateWordList = list => {
  return {
    type: UPDATE_WORD_LIST,
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

const updateReviewList = query => {
  return {
    type: UPDATE_REVIEW_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

export {
  loadPicture,
  loadQuery,
  loadOriginalWordList,
  loadWordList,
  updateOriginalWordList,
  updateWordList,
  updateReviewList,
  sendRomanized,
  sendTranslated
}
