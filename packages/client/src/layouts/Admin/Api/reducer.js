import reduxCrud from 'redux-crud'

const baseReducers = reduxCrud.Map.reducersFor('word')

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return baseReducers(state, action)
  }
}
