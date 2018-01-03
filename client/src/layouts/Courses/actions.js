import {COURSE_LANGUAGE} from './types.js'

const chooseCourseLanguage = courseLanguage => {
  return {
    type: COURSE_LANGUAGE,
    payload: new Promise((resolve, reject) => {
      resolve(courseLanguage)
    })
  }
}

export {chooseCourseLanguage}
