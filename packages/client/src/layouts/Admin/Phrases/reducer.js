import reduxCrud from 'redux-crud'

const baseReducers = reduxCrud.Map.reducersFor('phrase')

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return baseReducers(state, action)
  }
}
