import actionTypes from '../actions/constants'
import { currentUTCTime } from '../lib/time'

const emptyMark = {
  'category': '',
  'description': '',
  'tags': '',
  'title': '',
  'type': '',
  'url': '',
  'id': '',
}

const initialState = {
  list: [],
  nextMark: Object.assign({}, emptyMark),
  currentMark: Object.assign({}, emptyMark),
  markInputter: '',
  displaySettings: {
    manyMarkInputIsOpen: false,
    // Recommend not using state for redux: https://github.com/reduxjs/redux/issues/1499
    editing: {},
  }
}


const marks = (state = initialState, action) => {
  var newMarks = []
  var editingDisplaySetting
  // var urls

  switch(action.type) {
    case actionTypes.MARKS.OPEN_MANY_MARK_INPUT:
      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          manyMarkInputIsOpen: true,
        }
      }
    case actionTypes.MARKS.CLOSE_MANY_MARK_INPUT:
      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          manyMarkInputIsOpen: false,
        }
      }
    case actionTypes.MARKS.CLEAR_MANY_MARK_INPUT:
      return {
        ...state,
        markInputter: '',
      }
    case actionTypes.MARKS.UPDATE_MANY_MARK_INPUT:
      return {
        ...state,
        markInputter: action.payload.value,
      }
    case actionTypes.MARKS.SUBMIT_MANY_MARK_INPUT:
      return {
        ...state
      }
    case actionTypes.MARKS.CLOSE_MARK_FORM:
      editingDisplaySetting = Object.assign({}, state.displaySettings.editing)
      editingDisplaySetting[action.payload.markId] = false

      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          editing: editingDisplaySetting,
        }
      }
    case actionTypes.MARKS.EDIT_MARK:
      editingDisplaySetting = Object.assign({}, state.displaySettings.editing)
      editingDisplaySetting[action.payload.markId] = true

      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          editing: editingDisplaySetting,
        }
      }
    case actionTypes.MARKS.LOAD_MARK:
      newMarks = state.list.slice()
      newMarks.push(action.payload.mark)

      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.MARKS.LOAD_MARKS:
      // DEPRECATED currently
      return {
        ...state,
        list: action.payload.marks
      }
    case actionTypes.MARKS.SET_CURRENT_MARK:
      return {
        ...state,
        currentMark: action.payload.mark,
      }
    case actionTypes.MARKS.UPDATE_MARK_FIELD:
      if(!action.payload.markId) {
        const newNextMark = Object.assign({}, state.nextMark)
        newNextMark[action.payload.name] = action.payload.value

        return {
          ...state,
          nextMark: newNextMark,
        }
      }

      newMarks = state.list.slice()
      newMarks = newMarks.map((mark) => {
        if(mark.id === action.payload.markId) {
          mark[action.payload.name] = action.payload.value
          return mark
        }
        return mark
      })
      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.MARKS.UPDATE_MARK:
      newMarks = state.list.slice()

      newMarks = newMarks.map((mark) => {
        if(mark.id === action.payload.mark.id) {
          return action.payload.mark
        }
        return mark
      })

      editingDisplaySetting = Object.assign({}, state.displaySettings.editing)
      editingDisplaySetting[action.payload.mark.id] = false

      return {
        ...state,
        list: newMarks,
        displaySettings: {
          ...state.displaySettings,
          editing: editingDisplaySetting,
        }
      }
    case actionTypes.MARKS.ADD_MARK:
      newMarks = state.list.slice()

      newMarks.push(Object.assign({},
                                  action.payload.mark))
      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.MARKS.ADD_NEXT_MARK:
      newMarks = state.list.slice()

      console.log(action.payload.mark)
      newMarks.push(Object.assign({},
                                  state.nextMark,
                                  {id: action.payload.mark.id}))
      return {
        ...state,
        list: newMarks,
        nextMark: Object.assign({}, initialState.nextMark),
      }
    case actionTypes.MARKS.DESTROY_MARK:
      newMarks = state.list.filter((item) => {
        return item.id !== action.payload.id
      })
      return {
        ...state,
        list: newMarks
      }
    case actionTypes.MARKS.ORGANIZE_MARKS:
      let key = 'createdAt'
      let order = 'descending'

      newMarks = state.list.slice()
      newMarks = newMarks.sort((a, b) => {
        if(!a[key]) {
          a[key] = 0
        }
        if(!b[key]) {
          b[key] = 0
        }
        if(order === 'descending') {
          return b[key] - a[key]
        } else {
          return a[key] - b[key]
        }
      })

      return {
        ...state,
        list: newMarks,
      }
    default:
      return state
  }
}

export default marks
