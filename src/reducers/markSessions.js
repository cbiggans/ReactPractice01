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
  newSession: Object.assign({}, emptyMarkSession)
}

const markSessions = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.MARK_SESSIONS.UPDATE_FIELD:
      // TODO XXX: Check if there's an ID, if there is update that specific session
      console.log('mark session reducer')
      return {
        ...state,
        newSession: {
          ...state.newSession,
          [action.payload.name]: action.payload.value,
        }
      }
    default:
      return state
  }
}

export default markSessions
