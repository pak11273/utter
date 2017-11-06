import {LOAD_QUESTION} from './types.js'

const loadQuestion = question => {
  return {
    type: LOAD_QUESTION,
    payload: new Promise((resolve, reject) => {
      resolve(question)
    })
  }
}

export {loadQuestion}
