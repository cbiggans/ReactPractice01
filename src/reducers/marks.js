import actionTypes from '../constants'

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
  var newMark

  switch(action.type) {
    case actionTypes.LOAD_MARK:
      // console.log(state)
      newMarks = state.list.slice()
      newMarks.push(action.payload.mark)

      return {
        ...state,
        list: newMarks,
      }
    case actionTypes.LOAD_MARKS:
      // DEPRECATED currently
      // console.log('Loading Marks')
      return {
        ...state,
        list: action.payload.marks
      }
    case actionTypes.SET_CURRENT_MARK:
      // console.log('Current Mark: ', action.payload.mark)
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
                                  // Should update key instead of id here, id
                                  //  should be restricted to actual id in
                                  //  database

      // newMarks.push(Object.assign({},
      //                             state.nextMark,
      //                             {id: (newMarks.length + 1) + ''}))

      // console.log('newMarks ' + newMarks)
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
