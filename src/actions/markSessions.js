import actionTypes from './constants'
import services from '../services/'


export const setCurrent = (id) => dispatch => {
  // TODO XXX: check the current state for the object first instead,
  //  if not there then load it into `markSession.collection` (mapping)
  //  and reference the id from there. Best to do that for performance reasons
  // Can use functions to dynamically get the correct collection from state

  services.markSessions.get(id, (session) => {
    dispatch({
      type: actionTypes.MARK_SESSIONS.SET_CURRENT,
      payload: {
        session: session,
      }
    })
  })
}

export const openCurrentEditor = () => dispatch => {
  dispatch({
    type: actionTypes.MARK_SESSIONS.OPEN_CURRENT_EDITOR,
  })
}

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

  if(id) {
    const markSession = state.markSessions.collection[id]

    services.markSessions.update(id, markSession, (session) => {
      dispatch({
        type: actionTypes.MARK_SESSIONS.UPDATE,
        payload: {
          session: session,
        }
      })
    })
  } else {
    services.markSessions.create(state.markSessions.next, (session) => {
      dispatch({
        type: actionTypes.MARK_SESSIONS.CREATE,
        payload: {
          session: session,
        }
      })
    })
  }

}

const markSessionActions = {
  setCurrent: setCurrent,
  openCurrentEditor: openCurrentEditor,
  fetch: fetch,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
}

export default markSessionActions
