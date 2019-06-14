import actionTypes from '../actions/constants'


const emptyMarkWidget = {
  title: '',      // RecentlyCreated
  searchTerm: '',
  order: '',      // descending vs. ascending
  maxTotal: 0,    // 10
}

const initialState = {
  collection: [],
  next: Object.assign({}, emptyMarkWidget),
  displayOptions: {},
}

const markWidgets = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}
