import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import actionTypes from './constants'

// TODO XXX: Put the Reducer in its own file/folder
//  Keep looking for it and have to think too much about it

const emptyMark = {
  'category': '',
  'description': '',
  'tags': '',
  'title': '',
  'type': '',
  'url': '',
}

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
  videoNoteTakerSettings: {
    newNoteEditorOpen: false,
    currentVideoId: '',
    type: '',
    playback: {
      currentTime: 0,
      shortJumpBackSeconds: -2,
      shortJumpForwardSeconds: 2,
      longJumpBackSeconds: -10,
      longJumpForwardSeconds: 10,
      playbackQuality: 'highres',
    }
  },
  nextMark: Object.assign({}, emptyMark),
  currentMark: Object.assign({}, emptyMark),
}

const reducers = (state=initialState, action) => {
  var newMarks = []

  switch(action.type) {
    case actionTypes.NEW_NOTE_OPEN:
      console.log('Open New Note')
      return {
        ...state,
        videoNoteTakerSettings: {
          ...state.videoNoteTakerSettings,
          newNoteEditorOpen: true,
        }
      }
    case actionTypes.LOAD_MARKS:
      console.log('Loading Marks')
      return {
        ...state,
        marks: action.payload.marks
      }
    case actionTypes.LOAD_MARK:
      console.log('Current Mark: ', action.payload.mark)
      return {
        ...state,
        currentMark: action.payload.mark,
      }
    case actionTypes.UPDATE_MARK_FIELD:
      const newNextMark = Object.assign({}, state.nextMark)
      newNextMark[action.payload.name] = action.payload.value

      return {
        ...state,
        nextMark: newNextMark,
      }
    case actionTypes.ADD_NEXT_MARK:
      newMarks = state.marks.slice()

      newMarks.push(Object.assign({},
                                  state.nextMark,
                                  {id: (state.marks.length + 1) + ''}))

      console.log('newMarks ' + newMarks)
      return {
        ...state,
        marks: newMarks,
        nextMark: Object.assign({}, initialState.nextMark),
      }
    case actionTypes.DESTROY_MARK:
      newMarks = state.marks.filter((item) => {
        return item.id !== action.payload.id
      })
      return {
        ...state,
        marks: newMarks
      }
    default:
      return state
  }
}

const store = createStore(reducers, applyMiddleware(thunk))

export default store
