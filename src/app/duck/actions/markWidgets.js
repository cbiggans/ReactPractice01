import actionTypes from './constants'
import services from '../services/'


export const openEditor = (id) => dispatch => {
  if(!id) {
    dispatch({
      type: actionTypes.MARK_WIDGETS.OPEN_EDITOR,
    })
  } else {
    dispatch({
      type: actionTypes.MARK_WIDGETS.OPEN_EDITOR,
      payload: {
        id: id,
      }
    })
  }
}

export const closeEditor = (id) => dispatch => {
  if(!id) {
    dispatch({
      type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
    })
  } else {
    dispatch({
      type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
      payload: {
        id: id,
      }
    })
  }
}

export const fetch = (sessionId) => dispatch => {
  services.markWidgets.index(sessionId, (widgets) => {
    widgets.forEach((widget) => {
      services.marks.getFromWidget(widget, (marks) => {
        // TODO XXX: MARK_WIDGETS.LOAD_MARKS
        // Need to provide callback
        dispatch({
          type: actionTypes.MARKS.LOAD_MARKS,
          payload: {
            marks: marks,
          },
        })
        dispatch({
          type: actionTypes.MARK_WIDGETS.LOAD_MARKS,
          payload: {
            marks: marks,
            widgetId: widget.id,
          },
        })
      })
    })

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

      dispatch({
        type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
        payload: {
          id: id,
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

      dispatch({
        type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
      })
    })
  }
}

export const destroy = (id) => dispatch => {
  services.markWidgets.destroy(id, (e) => {
    dispatch({
      type: actionTypes.MARK_WIDGETS.DESTROY,
      payload: {
        id: id,
      }
    })
  })
}

const markWidgetActions = {
  openEditor: openEditor,
  closeEditor: closeEditor,
  fetch: fetch,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  destroy: destroy,
}

export default markWidgetActions
