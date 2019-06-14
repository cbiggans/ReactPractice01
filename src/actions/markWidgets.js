import actionTypes from './constants'
import services from '../services/'


export const openEditor = (id) => dispatch => {
  dispatch({
    type: actionTypes.MARK_WIDGETS.OPEN_NEW_EDITOR,
  })
}

export const closeEditor = (id) => dispatch => {
  dispatch({
    type: actionTypes.MARK_WIDGETS.CLOSE_NEW_EDITOR,
  })
}

export const fetch = (sessionId) => dispatch => {
  services.markWidgets.index((widgets) => {
    dispatch({
      type: actionTypes.MARK_WIDGETS.LOAD,
      payload: {
        widgets: widgets,
      }
    })
  })
}

export const handleChange = (e, id) => dispatch => {
  const { name, value } = e.target

  dispatch({
    type: actionTypes.MARK_WIDGETS.UPDATE_FIELD,
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
  const markSessionId = state.markSessions.currentId

  if(id) {
    const markWidget = state.markWidgets.collection[id]

    services.markWidgets.update(id, markWidget, (widget) => {
      dispatch({
        type: actionTypes.MARK_WIDGETS.UPDATE,
        payload: {
          widget: widget,
        }
      })
    })
  } else {
    state.markWidgets.next.markSessionIds = [markSessionId]

    services.markWidgets.create(state.markWidgets.next, (widget) => {
      dispatch({
        type: actionTypes.MARK_WIDGETS.CREATE,
        payload: {
          widget: widget,
        }
      })
    })
  }
}

const markWidgetActions = {
  openEditor: openEditor,
  closeEditor: closeEditor,
  fetch: fetch,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
}

export default markWidgetActions
