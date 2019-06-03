import { createStore } from 'redux'

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
    case 'UPDATE_MARK_FIELD':
      // make copy of nextMark
      // Update value
      // return

      const newNextMark = Object.assign({}, state.nextMark)
      newNextMark[action.payload.name] = action.payload.value
      return {
        ...state,
        nextMark: newNextMark,
      }
    case 'ADD_NEXT_MARK':
      // create new marks array
      const newMarks = state.marks.slice()

      // Add nextMark to new marks
      newMarks.push(Object.assign({},
                                  state.nextMark,
                                  {id: (state.marks.length + 1) + ''}))
      // clear nextMark

      // put new stuff in return
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

const store = createStore(reducers)

export default store
