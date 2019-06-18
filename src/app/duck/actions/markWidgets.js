import actionTypes from './constants'
import services from '../services/'
import markActions from './marks'
// import markGroupActions from './markGroups'
import { create } from './markGroups'


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

// TODO XXX: Should pass in markSessionId so this is better
export const handleSubmit = (e, id) => (dispatch, getState) => {
  e.preventDefault()

  const state = getState()
  const markSessionId = state.markSessions.currentId
  let key = id ? id : 'nextEditor'
  const markWidget = state.markWidgets.displayOptions.openEditors[key].widget

  if(markWidget.markInputter && markWidget.markInputter !== '') {
    // Parse the Marks into a list here
    const urls = markWidget.markInputter.split('\n')
    // Create Marks from manyMarkInputter in services
    const promises = []
    urls.forEach((url) => {
      promises.push(new Promise((resolve) => {
          dispatch(markActions.createThroughURL(url, resolve))
        })
      )
    })

    Promise.all(promises)
    .then((marks) => {
      let markIds = marks.map((mark) => {
        return mark.id
      })

      // TODO XXX: Generate markGroup from factory
      //  Allows me to control how the data looks on creation
      let markGroup = {
        title: '',
        description: '',
        tags: [],
        markIds: markIds,
      }

      debugger
      // TODO XXX: Rename create to something else
      dispatch(create(markGroup, (markGroup) => {

        debugger
        var a = 12
      }))
      // Create the Group
      // Save the groupid for the markWidget
      //  Add a list of MarkGroupIds to markWidgets, don't worry about search term yet
    })
  }
  // Add the groupId to the markWidget

  // TODO XXX: Most of this stuff should be in separate action that can call in here

  // if(id) {
  //   markWidget = state.markWidgets.displayOptions.openEditors[id].widget

  //   services.markWidgets.update(id, markWidget, (widget) => {
  //     dispatch({
  //       type: actionTypes.MARK_WIDGETS.UPDATE,
  //       payload: {
  //         widget: widget,
  //       }
  //     })

  //     dispatch({
  //       type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
  //       payload: {
  //         id: id,
  //       }
  //     })

  //     // TODO XXX: dispatch refresh of just the single widget to save on service call
  //     dispatch(fetch(markSessionId))
  //   })
  // } else {
  //   markWidget = state.markWidgets.displayOptions.openEditors['nextEditor'].widget
  //   markWidget.markSessionIds = [markSessionId]

  //   services.markWidgets.create(markWidget, (widget) => {
  //     dispatch({
  //       type: actionTypes.MARK_WIDGETS.CREATE,
  //       payload: {
  //         widget: widget,
  //       }
  //     })

  //     dispatch({
  //       type: actionTypes.MARK_WIDGETS.CLOSE_EDITOR,
  //     })
  //   })
  // }
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
