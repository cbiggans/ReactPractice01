import actionTypes from '../actions/constants'


// TODO XXX: These empty ones should be defined in their session classes
const emptyMarkSession = {
  title: '',
  markWidgetIds: [],
  description: '',
  categories: [],
  type: '',
  tags: [],
  created: '',
  modified: '',
}


const initialState = {
  collection: {},
  currentId: null,
  widgets: [],
  next: Object.assign({}, emptyMarkSession),
  displayOptions: {
    currentMarkSessionEditorIsOpen: false,
  }
}

const markSessions = (state = initialState, action) => {
  let tmpCollection = {}
  let tmpMarkSession = {}

  switch(action.type) {
    case actionTypes.MARK_SESSIONS.OPEN_CURRENT_EDITOR:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          currentMarkSessionEditorIsOpen: true
        }
      }
    case actionTypes.MARK_SESSIONS.CLOSE_CURRENT_EDITOR:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          currentMarkSessionEditorIsOpen: false
        }
      }
    case actionTypes.MARK_SESSIONS.SET_CURRENT:
      tmpCollection = Object.assign({}, state.collection)
      tmpCollection[action.payload.session.id] = action.payload.session

      return {
        ...state,
        collection: tmpCollection,
        currentId: action.payload.session.id,
      }
    case actionTypes.MARK_SESSIONS.LOAD:
      // TODO XXX: This is common, should create helper function
      //  Will want to Order this as well
      tmpCollection = Object.assign({}, state.collection)
      action.payload.sessions.forEach((session) => {
        tmpCollection[session.id] = session
      })

      return {
        ...state,
        collection: tmpCollection,
      }
    case actionTypes.MARK_SESSIONS.UPDATE_FIELD:
      if(action.payload.id) {
        tmpMarkSession = Object.assign({}, state.collection[action.payload.id])
        tmpMarkSession[action.payload.name] = action.payload.value
        state.collection[action.payload.id] = tmpMarkSession

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
    case actionTypes.MARK_SESSIONS.UPDATE:
      return {
        ...state,
        displayOptions: {
          ...state.displayOptions,
          currentMarkSessionEditorIsOpen: false,
        }
      }
    case actionTypes.MARK_SESSIONS.CREATE:
      tmpCollection = Object.assign({}, state.collection)
      tmpCollection[action.payload.session.id] = action.payload.session

      return {
        ...state,
        collection: tmpCollection,
      }
    default:
      return state
  }
}

export default markSessions
