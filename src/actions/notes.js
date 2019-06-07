import actionTypes from './constants'
import services from '../services/'


export const fetch = (markId) => dispatch => {
  services.notes.index([markId], (notes) => {
    notes.map(note => {
      dispatch({
        type: actionTypes.LOAD_NOTE,
        payload: {
          note: note
        }
      })
      return note
    })
  })
}

export const openNew = (currentTime) => dispatch => {
  dispatch({
    type: actionTypes.OPEN_NEW_NOTE,
    payload: {
      timestamp: currentTime,
    }
  })
}

export const createBookmark = (currentTime) => (dispatch, getState) => {
  const state = getState()
  const newBookmark = Object.assign({},
                                    state.notes.newBookmark, 
                                    {timestamp: currentTime})
  services.notes.create(state.marks.currentMark.id, newBookmark, (note) => {
    dispatch({
      type: actionTypes.CREATE_NEW_NOTE,
      payload: {
        'markId': state.marks.currentMark.id,
        'note': note,
      }
    })
  })
}

export const closeNew = () => dispatch => {
  dispatch({
    type: actionTypes.CLOSE_NEW_NOTE
  })
}

export const handleChange = (e) => dispatch => {
  const { name, value } = e.target
  dispatch({
    type: actionTypes.CHANGE_NEW_NOTE,
    payload: {
      name: name,
      text: value,
    }
  })
}

export const handleSubmit = (e) => (dispatch, getState) => {
  e.preventDefault()

  const state = getState()
  services.notes.create(state.marks.currentMark.id,
                        state.notes.newNote,
                        (note) => {
    dispatch({
      type: actionTypes.CREATE_NEW_NOTE,
      payload: {
        'markId': state.marks.currentMark.id,
        'note': note,
      }
    })
  })
}

export const changeNoteOrder = (markId, order) => dispatch => {
  dispatch({
    type: actionTypes.CHANGE_NOTE_ORDER,
    payload: {
      markId: markId,
      order: order,
    }
  })
}

export const destroy = (id, markId) => dispatch => {
  services.notes.destroy(id, (e) => {
    dispatch({
      type: actionTypes.DESTROY_NOTE,
      payload: {
        id: id,
        markId: markId,
      }
    })
  })
}


const noteActions = {
  fetch: fetch,
  openNew: openNew,
  createBookmark: createBookmark,
  closeNew: closeNew,
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  changeNoteOrder: changeNoteOrder,
  destroy: destroy,
}

export default noteActions
