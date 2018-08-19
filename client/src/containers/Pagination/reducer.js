import {createReducer} from '../../utils/reduxUtils.js'
import {PAGINATE_ASYNC} from './types.js'

const initialState = {
  collection: '',
  loading: false,
  search: '',
  query: {
    courseProp: 'all',
    learningLang: 'all',
    nativeLang: 'english',
    items: '',
    limit: '',
    activePage: '',
    boundaryRange: '',
    siblingRange: '',
    showEllipsis: '',
    showFirstAndLastNav: '',
    showPreviousAndNextNav: '',
    totalPages: ''
  }
}

export default createReducer(initialState, {
  [PAGINATE_ASYNC.REQUEST]: state => ({
    ...state,
    loading: true
  })
})
