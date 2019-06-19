import actionTypes from '../actions/constants'
import markDataConstants from '../data/marks'
import markFunctions from '../funcs/marks'


const initialState = markFunctions.generateInitialState()


const marks = (state = initialState, action) => {
  var newList = []
  var newCollection = {}
  var editingDisplaySetting
  var newDisplaySettings
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
      newDisplaySettings = markFunctions.displaySettings.setEditor(
        state.displaySettings, action.payload.markId, false
      )

      return {
        ...state,
        displaySettings: newDisplaySettings,
      }
    case actionTypes.MARKS.EDIT_MARK:
      newDisplaySettings = markFunctions.displaySettings.setEditor(
        state.displaySettings, action.payload.markId, true
      )

      return {
        ...state,
        displaySettings: newDisplaySettings,
      }
    case actionTypes.MARKS.LOAD_MARK:
      newList = markFunctions.list.add(state.list,
                                        action.payload.mark)
      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        list: newList,
        collection: newCollection,
      }
    case actionTypes.MARKS.LOAD_MARKS:
      newCollection = markFunctions.collection.addList(state.collection,
                                                       action.payload.marks)

      newList = markFunctions.list.addList(state.list, action.payload.marks)

      return {
        ...state,
        list: newList,
        collection: newCollection,
      }
    case actionTypes.MARKS.SET_CURRENT_MARK:
      return {
        ...state,
        currentMark: action.payload.mark,
      }
    case actionTypes.MARKS.UPDATE_MARK_FIELD:
      if(!action.payload.markId) {
        const newNextMark = markFunctions.mark.copy(
          state.nextMark, {
            [action.payload.name]: action.payload.value
          })

        return {
          ...state,
          nextMark: newNextMark,
        }
      }

      // TODO XXX: Should take this out entirely and just have list of id's
      //  This current implementation is absurd
      newList = state.list.slice()
			// TODO XXX: Should create a method the removes item from list
      newList = newList.map((mark) => {
        if(mark.id === action.payload.markId) {
          mark[action.payload.name] = action.payload.value
          return mark
        }
        return mark
      })
      return {
        ...state,
        list: newList,
      }
    case actionTypes.MARKS.UPDATE_MARK:
      newList = state.list.slice()

      newList = newList.map((mark) => {
        if(mark.id === action.payload.mark.id) {
          return action.payload.mark
        }
        return mark
      })

      newDisplaySettings = markFunctions.displaySettings.setEditor(
        state.displaySettings, action.payload.mark.id, false
      )

      return {
        ...state,
        list: newList,
        displaySettings: newDisplaySettings,
      }
    case actionTypes.MARKS.ADD_MARK:
      newList = markFunctions.list.add(state.list,
                                        action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)
      return {
        ...state,
        list: newList,
        collection: newCollection,
      }
    case actionTypes.MARKS.ADD_NEXT_MARK:
      newList = markFunctions.list.add(state.list,
                                        action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        list: newList,
        collection: newCollection,
        nextMark: markFunctions.mark.copy(initialState.nextMark),
      }
    case actionTypes.MARKS.DESTROY_MARK:
      newList = state.list.filter((item) => {
        return item.id !== action.payload.id
      })
      // TODO XXX: Handle collection
      return {
        ...state,
        list: newList
      }
    default:
      return state
  }
}

export default marks
