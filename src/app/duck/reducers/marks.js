import actionTypes from '../actions/constants'
import markDataConstants from '../data/marks'
import markFunctions from '../funcs/marks'


const initialState = markFunctions.generateInitialState()


const marks = (state = initialState, action) => {
  var newOrder = []
  var newCollection = {}
  var editingDisplaySetting
  var newDisplaySettings
  var newEditing = {}
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
      newEditing = markFunctions.editing.copy(
        state.editing, {[action.payload.markId]: false}
      )

      return {
        ...state,
        editing: newEditing,
      }
    // TODO XXX: Should probably be open mark form
    case actionTypes.MARKS.EDIT_MARK:
      newEditing = markFunctions.editing.copy(
        state.editing, {[action.payload.markId]: true}
      )

      return {
        ...state,
        editing: newEditing,
      }
    case actionTypes.MARKS.LOAD_MARK:
      newOrder = markFunctions.order.addMark(state.list,
                                             action.payload.mark)
      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        list: newOrder,
        collection: newCollection,
      }
    case actionTypes.MARKS.LOAD_MARKS:
      newCollection = markFunctions.collection.addMarks(state.collection,
                                                        action.payload.marks)

      newOrder = markFunctions.order.addMarks(state.list, action.payload.marks)

      return {
        ...state,
        list: newOrder,
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
      newOrder = state.list.slice()
			// TODO XXX: Should create a method the removes item from list
      newOrder = newOrder.map((mark) => {
        if(mark.id === action.payload.markId) {
          mark[action.payload.name] = action.payload.value
          return mark
        }
        return mark
      })


      return {
        ...state,
        list: newOrder,
      }
    case actionTypes.MARKS.UPDATE_MARK:
      newOrder = state.list.slice()

      newOrder = newOrder.map((mark) => {
        if(mark.id === action.payload.mark.id) {
          return action.payload.mark
        }
        return mark
      })

      newEditing = markFunctions.editing.copy(
        state.editing, {[action.payload.mark.id]: false}
      )

      return {
        ...state,
        list: newOrder,
        editing: newEditing,
      }
    case actionTypes.MARKS.ADD_MARK:
      newOrder = markFunctions.order.addMark(state.list,
                                             action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)
      return {
        ...state,
        list: newOrder,
        collection: newCollection,
      }
    case actionTypes.MARKS.ADD_NEXT_MARK:
      newOrder = markFunctions.order.addMark(state.list,
                                            action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        list: newOrder,
        collection: newCollection,
        nextMark: markFunctions.mark.copy(initialState.nextMark),
      }
    case actionTypes.MARKS.DESTROY_MARK:
      newOrder = state.list.filter((item) => {
        return item.id !== action.payload.id
      })
      // TODO XXX: Handle collection
      return {
        ...state,
        list: newOrder
      }
    default:
      return state
  }
}

export default marks
