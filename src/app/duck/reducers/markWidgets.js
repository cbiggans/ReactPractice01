import actionTypes from '../actions/constants'


const emptyMarkWidget = {
  title: '',      // RecentlyCreated
  searchTerm: '',
  order: '',      // descending vs. ascending
  maxTotal: 0,    // 10
  markSessionIds: [],
}

const initialState = {
  collection: {},
  next: Object.assign({}, emptyMarkWidget),
  markIdOrderMap: {},
  displayOptions: {
    newMarkWidgetEditorIsOpen: false,
    openEditors: {},
  },
}

const markWidgets = (state = initialState, action) => {
  let tmpMarkWidget
  let tmpCollection
  let markIdOrderMap
  let tmpOpenEditors

  switch(action.type) {
    case actionTypes.MARK_WIDGETS.OPEN_NEW_EDITOR:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          newMarkWidgetEditorIsOpen: true
        }
      }
    case actionTypes.MARK_WIDGETS.OPEN_EDITOR:
      tmpOpenEditors = Object.assign({}, state.displayOptions.openEditors)

      if(action.payload && action.payload.id) {
        tmpOpenEditors[action.payload.id] = true
      } else {
        tmpOpenEditors['newEditor'] = true
      }

      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          openEditors: tmpOpenEditors
        }
      }
    case actionTypes.MARK_WIDGETS.CLOSE_NEW_EDITOR:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          newMarkWidgetEditorIsOpen: false
        }
      }
    case actionTypes.MARK_WIDGETS.CLOSE_EDITOR:
      tmpOpenEditors = Object.assign({}, state.displayOptions.openEditors)

      if(action.payload && action.payload.id) {
        tmpOpenEditors[action.payload.id] = false
      } else {
        tmpOpenEditors['newEditor'] = false
      }

      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          openEditors: tmpOpenEditors
        }
      }
    case actionTypes.MARK_WIDGETS.LOAD:
      // TODO XXX: This is common, should create helper function
      //  Will want to Order this as well
      tmpCollection = Object.assign({}, state.collection)
      action.payload.widgets.forEach((widget) => {
        tmpCollection[widget.id] = widget
      })

      return {
        ...state,
        collection: tmpCollection,
      }
    case actionTypes.MARK_WIDGETS.LOAD_MARKS:
      markIdOrderMap = Object.assign({}, state.markIdOrderMap)
      
      markIdOrderMap[action.payload.widgetId] = action.payload.marks.map((mark) => {
        return mark.id
      })

      return {
        ...state,
        markIdOrderMap: markIdOrderMap,
      }
    case actionTypes.MARK_WIDGETS.UPDATE_FIELD:
      if(action.payload.id) {
        tmpMarkWidget = Object.assign({}, state.collection[action.payload.id])
        tmpMarkWidget[action.payload.name] = action.payload.value
        state.collection[action.payload.id] = tmpMarkWidget

        return {
          ...state,
          collection: state.collection,
        }
      }
      return {
        ...state,
        next: {
          ...state.next,
          [action.payload.name]: action.payload.value,
        }
      }
    case actionTypes.MARK_WIDGETS.UPDATE:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          currentMarkWidgetEditorIsOpen: false,
        }
      }
    case actionTypes.MARK_WIDGETS.CREATE:
      tmpCollection = Object.assign({}, state.collection)
      tmpCollection[action.payload.widget.id] = action.payload.widget

      return {
        ...state,
        collection: tmpCollection,
      }
    default:
      return state
  }
}

export default markWidgets
