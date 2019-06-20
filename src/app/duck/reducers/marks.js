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
  var markForEditing

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
      markForEditing = markFunctions.collection.copy(state.collection[action.payload.markId])

      newEditing = markFunctions.editing.copy(
        state.editing, {[action.payload.markId]: markForEditing}
      )

      return {
        ...state,
        editing: newEditing,
      }
    case actionTypes.MARKS.LOAD_MARK:
      newOrder = markFunctions.order.addMark(state.orderedIds,
                                             action.payload.mark)
      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        orderedIds: newOrder,
        collection: newCollection,
      }
    case actionTypes.MARKS.LOAD_MARKS:
      newCollection = markFunctions.collection.addMarks(state.collection,
                                                        action.payload.marks)

      newOrder = markFunctions.order.addMarks(state.orderedIds, action.payload.marks)

      return {
        ...state,
        orderedIds: newOrder,
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

      newEditing = markFunctions.editing.copy(state.editing)
      newEditing[action.payload.markId][action.payload.name] = action.payload.value

      return {
        ...state,
        editing: newEditing,
      }
    case actionTypes.MARKS.UPDATE_MARK:
      // setMarks
      newCollection = markFunctions.collection.copy(state.collection)
      newCollection[action.payload.mark.id] = action.payload.mark

      newEditing = markFunctions.editing.copy(
        state.editing, {[action.payload.mark.id]: false}
      )

      return {
        ...state,
        collection: newCollection,
        editing: newEditing,
      }
    case actionTypes.MARKS.ADD_MARK:
      newOrder = markFunctions.order.addMark(state.orderedIds,
                                             action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)
      return {
        ...state,
        orderedIds: newOrder,
        collection: newCollection,
      }
    case actionTypes.MARKS.ADD_NEXT_MARK:
      newOrder = markFunctions.order.addMark(state.orderedIds,
                                            action.payload.mark)

      newCollection = markFunctions.collection.add(state.collection,
                                                   action.payload.mark)

      return {
        ...state,
        orderedIds: newOrder,
        collection: newCollection,
        nextMark: markFunctions.mark.copy(initialState.nextMark),
      }
    case actionTypes.MARKS.DESTROY_MARK:
      newOrder = state.orderedIds.filter((item) => {
        return item.id !== action.payload.id
      })
      // TODO XXX: Handle collection
      return {
        ...state,
        orderedIds: newOrder
      }
    default:
      return state
  }
}

export default marks
