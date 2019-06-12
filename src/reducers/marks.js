import actionTypes from '../actions/constants'

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
    editing: new Set(),
  }
}


const marks = (state = initialState, action) => {
  var newMarks = []
  var editingDisplaySetting
  // var urls

  switch(action.type) {
    case actionTypes.OPEN_MANY_MARK_INPUT:
      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          manyMarkInputIsOpen: true,
        }
      }
    case actionTypes.CLOSE_MANY_MARK_INPUT:
      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          manyMarkInputIsOpen: false,
        }
      }
    case actionTypes.CLEAR_MANY_MARK_INPUT:
      return {
        ...state,
        markInputter: '',
      }
    case actionTypes.UPDATE_MANY_MARK_INPUT:
      return {
        ...state,
        markInputter: action.payload.value,
      }
    case actionTypes.SUBMIT_MANY_MARK_INPUT:
      return {
        ...state
      }
    case actionTypes.EDIT_MARK:
      editingDisplaySetting = new Set(state.displaySettings.editing)
      editingDisplaySetting.add(action.payload.markId)
      console.log(editingDisplaySetting)

      return {
        ...state,
        displaySettings: {
          ...state.displaySettings,
          editing: editingDisplaySetting,
        }
      }
    case actionTypes.LOAD_MARK:
      newMarks = state.list.slice()
      newMarks.push(action.payload.mark)

      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.LOAD_MARKS:
      // DEPRECATED currently
      return {
        ...state,
        list: action.payload.marks
      }
    case actionTypes.SET_CURRENT_MARK:
      return {
        ...state,
        currentMark: action.payload.mark,
      }
    case actionTypes.UPDATE_MARK_FIELD:
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
    case actionTypes.UPDATE_MARK:
      newMarks = state.list.slice()

      newMarks = newMarks.map((mark) => {
        if(mark.id === action.payload.mark.id) {
          return action.payload.mark
        }
        return mark
      })

      editingDisplaySetting = new Set(state.displaySettings.editing)
      editingDisplaySetting.delete(action.payload.mark.id)

      return {
        ...state,
        list: newMarks,
        displaySettings: {
          ...state.displaySettings,
          editing: editingDisplaySetting,
        }
      }
    case actionTypes.ADD_MARK:
      newMarks = state.list.slice()

      newMarks.push(Object.assign({},
                                  action.payload.mark))
      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.ADD_NEXT_MARK:
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
    case actionTypes.DESTROY_MARK:
      newMarks = state.list.filter((item) => {
        return item.id !== action.payload.id
      })
      return {
        ...state,
        list: newMarks
      }
    default:
      return state
  }
}

export default marks
