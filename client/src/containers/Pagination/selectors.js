import {createSelector} from 'reselect'

const setState = (state, props) => {
  // do something with props
  return state.paginateReducer.query.courseProp
}

export const selectCourseProp = () =>
  createSelector(setState, courseProp => {
    courseProp
  })
