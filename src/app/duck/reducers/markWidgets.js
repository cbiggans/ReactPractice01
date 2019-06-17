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

const emptyEditor = {
  widget: Object.assign({}, emptyMarkWidget),
  displayOptions: {
    manualInputterOpen: false,
  },
}

const markWidgets = (state = initialState, action) => {
  let tmpMarkWidget
  let tmpCollection
  let markIdOrderMap
  let tmpOpenEditors
  let tmpEditor
  let key

  switch(action.type) {
    case actionTypes.MARK_WIDGETS.OPEN_MANUAL_INPUTTER:
      tmpOpenEditors = Object.assign({}, state.displayOptions.openEditors)

      if(action.payload && action.payload.id) {
        key = action.payload.id
      } else {
        key = 'nextEditor'
      }

      tmpEditor = Object.assign({}, tmpOpenEditors[key])
      tmpEditor.displayOptions = Object.assign({}, tmpEditor.displayOptions, {manualInputterOpen: true})
      tmpEditor.widget = Object.assign({}, tmpEditor.widget, {markInputter: ''})

      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          openEditors: {
            ...state.displayOptions.openEditors,
            [key]: tmpEditor,
          }
        }
      }
    case actionTypes.MARK_WIDGETS.CLOSE_MANUAL_INPUTTER:
      return state
    case actionTypes.MARK_WIDGETS.OPEN_EDITOR:
      tmpOpenEditors = Object.assign({}, state.displayOptions.openEditors)

      if(action.payload && action.payload.id) {
        tmpOpenEditors[action.payload.id] = Object.assign({}, emptyEditor)
        tmpOpenEditors[action.payload.id].widget = Object.assign(
          {}, state.collection[action.payload.id]
        )
      } else {
        tmpOpenEditors['nextEditor'] = Object.assign({}, emptyEditor)
      }

      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          openEditors: tmpOpenEditors
        }
      }
    case actionTypes.MARK_WIDGETS.CLOSE_EDITOR:
      tmpOpenEditors = Object.assign({}, state.displayOptions.openEditors)

      if(action.payload && action.payload.id) {
        tmpOpenEditors[action.payload.id] = false
      } else {
        tmpOpenEditors['nextEditor'] = false
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
      var id = action.payload.id
      if(!id) {
        id = 'nextEditor'
      }

      tmpMarkWidget = Object.assign({}, state.displayOptions.openEditors[id].widget)
      tmpMarkWidget[action.payload.name] = action.payload.value

      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          openEditors: {
            ...state.displayOptions.openEditors,
            [id]: {
              ...state.displayOptions.openEditors[id],
              widget: tmpMarkWidget,
            }
          },
        }
      }
    case actionTypes.MARK_WIDGETS.UPDATE:
      tmpCollection = Object.assign({}, state.collection)
      tmpCollection[action.payload.widget.id] = action.payload.widget

      return {
        ...state,
        collection: tmpCollection,
      }
    case actionTypes.MARK_WIDGETS.CREATE:
      tmpCollection = Object.assign({}, state.collection)
      tmpCollection[action.payload.widget.id] = action.payload.widget

      return {
        ...state,
        collection: tmpCollection,
      }
    case actionTypes.MARK_WIDGETS.DESTROY:
      tmpCollection = Object.assign({}, state.collection)
      delete tmpCollection[action.payload.id]

      return {
        ...state,
        collection: tmpCollection,
      }
    default:
      return state
  }
}

export default markWidgets
