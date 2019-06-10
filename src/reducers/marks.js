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
  }
}


const marks = (state = initialState, action) => {
  var newMarks = []
  var urls

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
      const newNextMark = Object.assign({}, state.nextMark)
      newNextMark[action.payload.name] = action.payload.value

      return {
        ...state,
        nextMark: newNextMark,
      }
    // UPDATE_MARK
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
