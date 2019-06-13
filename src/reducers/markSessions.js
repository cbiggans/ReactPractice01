import actionTypes from '../actions/constants'
// import { currentUTCTime } from '../lib/time'


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
  list: [],
  current: Object.assign({}, emptyMarkSession),
  widgets: [],
  next: Object.assign({}, emptyMarkSession)
}

const markSessions = (state = initialState, action) => {
  let tmpList = []

  switch(action.type) {
    case actionTypes.MARK_SESSIONS.LOAD:
      // TODO XXX: This is common, should create helper function
      //  Will want to Order this as well

      tmpList = state.list.slice()
      tmpList = tmpList.concat(action.payload.sessions)

      return {
        ...state,
        list: tmpList,
      }
    case actionTypes.MARK_SESSIONS.UPDATE_FIELD:
      // TODO XXX: Check if there's an ID, if there is update that specific session
      return {
        ...state,
        next: {
          ...state.next,
          [action.payload.name]: action.payload.value,
        }
      }
    case actionTypes.MARK_SESSIONS.CREATE:
      tmpList = state.list.slice()
      tmpList.push(action.payload.session)
      return {
        ...state,
        list: tmpList,
      }
    default:
      return state
  }
}

export default markSessions
