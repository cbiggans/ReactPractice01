import actionTypes from './constants'
import services from '../services/'
import { currentUTCTime } from '../lib/time'


/*
 *  See the importance of thunk here because we wantto be able to define these
 *  functions elsewhere and it's cleaner for the mapDispatchToProps if the
 *  dispatch is provided something like this
 */

function scrapeWebsite(url) {
  // Have Update button for doing a new scrape of the mark and updating
  //  it with newer data

  return fetch('/scrape_url/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded', // Important
    },
    body: JSON.stringify({
        url: url,
    })
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    return data
  })
}

export const editMark = (markId) => dispatch => {
  dispatch({
    type: actionTypes.EDIT_MARK,
    payload: {
      markId: markId,
    }
  })
}

export const handleOpenManyMarkInput = () => (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_MANY_MARK_INPUT,
  })
}

export const handleCloseManyMarkInput = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_MANY_MARK_INPUT,
  })
  dispatch({
    type: actionTypes.CLOSE_MANY_MARK_INPUT,
  })
}

export const handleMarkInputterChange = (e) => dispatch => {
  const { name, value } = e.target

  dispatch({
    type: actionTypes.UPDATE_MANY_MARK_INPUT,
    payload: {
      name: name,
      value: value,
    }
  })
}

export const handleManyMarkInputterSubmit = (e) => (dispatch, getState) => {
  e.preventDefault()

  var newMark
  const state = getState()
  const createdAt = currentUTCTime()
  const modifiedAt = currentUTCTime()

  const urls = state.marks.markInputter.split('\n')

  urls.forEach(url => {
    scrapeWebsite(url)
    .then((scrapedData) => {
      newMark = {
        'createdAt': createdAt,
        'modifiedAt': modifiedAt,
        'category': '',
        'description': '',
        'tags': '',
        'title': scrapedData.title,
        'type': '',
        'url': url,
      }
      services.marks.create(newMark, (mark) => {
        dispatch({
          type: actionTypes.ADD_MARK,
          payload: {
            'mark': mark
          }
        })
      })
    })
  })

  dispatch({
    type: actionTypes.SUBMIT_MANY_MARK_INPUT,
  })
  // dispatch({
  //   type: actionTypes.CLEAR_MANY_MARK_INPUT,
  // })
}

export const handleChange = (e, markId) => dispatch => {
  const { name, value } = e.target

  dispatch({
    type: actionTypes.UPDATE_MARK_FIELD,
    payload: {
      name: name,
      value: value,
      markId: markId,
    }
  })
}

export const handleSubmit = (e, markId) => (dispatch, getState) => {
  e.preventDefault()

  const state = getState()
  // If there's a markId, then edit the mark & do update action, else create it
  console.log('markId: ', markId)
  if(!markId) {
    services.marks.create(state.marks.nextMark, (mark) => {
      dispatch({
        type: actionTypes.ADD_NEXT_MARK,
        payload: {
          'mark': mark
        }
      })
    })
  } else {
    const marksData = state.marks.list.filter((mark) => {
      if(mark.id === markId) {
        return mark
      }
    })
    services.marks.update(markId, marksData[0], (mark) => {
      dispatch({
        type: actionTypes.UPDATE_MARK,
        payload: {
          'mark': mark
        }
      })
    })
  }
}

export const load = (e) => dispatch => {
  services.marks.index((marks) => {
    marks.map(mark => {
      dispatch({
        type: actionTypes.LOAD_MARK,
        payload: {
          mark: mark,
        }
      })
      return mark
    })
  })
}

export const setCurrentMark = (id) => dispatch => {
  services.marks.get(id, (mark) => {
    mark.id = id
    dispatch({
      type: actionTypes.SET_CURRENT_MARK,
      payload: {
        mark: mark,
      }
    })
  })
}

export const destroy = (id) => dispatch => {
  services.marks.destroy(id, (e) => {
    dispatch({
      type: actionTypes.DESTROY_MARK,
      payload: {
        id: id,
      }
    })
  })
}

const markActions = {
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  load: load,
  setCurrentMark: setCurrentMark,
  destroy: destroy,
  editMark: editMark,
  handleOpenManyMarkInput: handleOpenManyMarkInput,
  handleMarkInputterChange: handleMarkInputterChange,
  handleManyMarkInputterSubmit: handleManyMarkInputterSubmit,
}

export default markActions
