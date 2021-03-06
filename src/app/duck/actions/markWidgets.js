import actionTypes from './constants'
import services from '../services/'
import markGroupActions from './markGroups'


// TODO XXX: This should be in something like a markWidgetForm directory instead of here
export const openFormManualInputter = (id) => dispatch => {
  if(!id) {
    dispatch({
      type: actionTypes.MARK_WIDGETS.OPEN_MANUAL_INPUTTER,
    })
  } else {
    dispatch({
      type: actionTypes.MARK_WIDGETS.OPEN_MANUAL_INPUTTER,
      payload: {
        id: id,
      }
    })
  }
}

export const closeFormManualInputter = (id) => dispatch => {
  if(!id) {
    dispatch({
      type: actionTypes.MARK_WIDGETS.CLOSE_MANUAL_INPUTTER,
    })
  } else {
    dispatch({
      type: actionTypes.MARK_WIDGETS.CLOSE_MANUAL_INPUTTER,
      payload: {
        id: id,
      }
    })
  }
}


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
      services.marks.indexFromWidget(widget, (marks) => {
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

export const update = (markWidget, markSessionId, callback) => dispatch => {
  services.markWidgets.update(markWidget.id, markWidget, (widget) => {
    dispatch({
      type: actionTypes.MARK_WIDGETS.UPDATE,
      payload: {
        widget: widget,
      }
    })

    // TODO XXX: dispatch refresh of just the single widget to save on service call
    dispatch(fetch(markSessionId))

    if(callback) {
      callback(widget)
    }
  })
}

export const create = (markWidget, callback) => dispatch => {
  services.markWidgets.create(markWidget, (widget) => {
    dispatch({
      type: actionTypes.MARK_WIDGETS.CREATE,
      payload: {
        widget: widget,
      }
    })
  })
}

export const handleFormUpdateOrCreation = (id, markWidget, markSessionId, markGroupId) => (dispatch) => {
  if(markGroupId) {
    if(!markWidget.markGroupIds) {
      markWidget.markGroupIds = []
    }
    markWidget.markGroupIds.push(markGroupId)
  }

  if(id) { 
    dispatch(update(markWidget, markSessionId, (widget) => {
      dispatch({
        type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
        payload: {
          id: id,
        }
      })
    }))
  } else {
    markWidget.markSessionIds = [markSessionId]

    dispatch(create(markWidget, (widget) => {
      dispatch({
        type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
      })
    }))
  }
}

// TODO XXX: Should pass in markSessionId so this is better
export const handleSubmit = (e, id) => (dispatch, getState) => {
  e.preventDefault()

  const state = getState()
  const markSessionId = state.markSessions.currentId
  let key = id ? id : 'nextEditor'
  const markWidget = state.markWidgets.displayOptions.openEditors[key].widget

  if(markWidget.markInputter && markWidget.markInputter !== '') {
    const urls = markWidget.markInputter.split('\n')

    dispatch(markGroupActions.createWithUrls(urls, (markGroup) => {
      dispatch(handleFormUpdateOrCreation(id, markWidget, markSessionId, markGroup.id))
    }))
  } else {
    dispatch(handleFormUpdateOrCreation(id, markWidget, markSessionId))
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
  openFormManualInputter: openFormManualInputter,
  closeFormManualInputter: closeFormManualInputter,
  fetch: fetch,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  destroy: destroy,
}

export default markWidgetActions
