import actionTypes from './constants'
import services from '../services/'


export const fetch = () => dispatch => {
  services.markSessions.index((sessions) => {
    // LOAD a list of markSessions
    dispatch({
      type: actionTypes.MARK_SESSIONS.LOAD,
      payload: {
        sessions: sessions,
      }
    })
  })
}

export const handleChange = (e, id) => dispatch => {
  const { name, value } = e.target

  dispatch({
    type: actionTypes.MARK_SESSIONS.UPDATE_FIELD,
    payload: {
      name: name,
      value: value,
      id: id,
    }
  })
}

export const handleSubmit = (e, id) => (dispatch, getState) => {
  e.preventDefault()

  const state = getState()

  // TODO XXX: Need to edit this for if editing existing markSession,
  //  then call update

  services.markSessions.create(state.markSessions.next, (session) => {
    dispatch({
      type: actionTypes.MARK_SESSIONS.CREATE,
      payload: {
        session: session,
      }
    })
  })

}

const markSessionActions = {
  fetch: fetch,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
}

export default markSessionActions
