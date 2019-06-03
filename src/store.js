import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import actionTypes from './constants'


const initialState = {
  marks: [{
    'id': '1',
    'category': 'Video',
    'description': 'This is a video',
    'tags': 'react, tutorial, redux',
    'title': 'This is a React Tutorial',
    'type': 'Youtube',
    'url': 'https://www.youtube.com/watch?v=93p3LxR9xfM&t=2467s',
  }],
  nextMark: {
    'category': '',
    'description': '',
    'tags': '',
    'title': '',
    'type': '',
    'url': '',
  }
}

const reducers = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_MARK_FIELD:
      const newNextMark = Object.assign({}, state.nextMark)
      newNextMark[action.payload.name] = action.payload.value

      return {
        ...state,
        nextMark: newNextMark,
      }
    case actionTypes.ADD_NEXT_MARK:
      const newMarks = state.marks.slice()

      newMarks.push(Object.assign({},
                                  state.nextMark,
                                  {id: (state.marks.length + 1) + ''}))

      console.log('newMarks ' + newMarks)
      return {
        ...state,
        marks: newMarks,
        nextMark: Object.assign({}, initialState.nextMark),
      }
    default:
      return state
  }
}

const store = createStore(reducers, applyMiddleware(thunk))

export default store
