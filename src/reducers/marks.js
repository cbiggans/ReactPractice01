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
}


const marks = (state = initialState, action) => {
  var newMarks = []

  switch(action.type) {
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