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
  // var timestamp = window['YT'].get('player').getCurrentTime()

  // console.log('Open Note Editor')
  console.log('Current Time: ', currentTime)
  dispatch({
    type: actionTypes.OPEN_NEW_NOTE,
    payload: {
      timestamp: currentTime,
    }
  })
}

export const createBookmark = (currentTime) => (dispatch, getState) => {
  console.log('Current Time: ', currentTime)

  const state = getState()
  console.log(state.marks.currentMark)
  const newBookmark = Object.assign({},
                                    state.notes.newBookmark, 
                                    {timestamp: currentTime})
  console.log('New Bookmark: ', newBookmark)
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
  // var timestamp = window['YT'].get('player').getCurrentTime()

  console.log('Closing Note Editor')
  dispatch({
    type: actionTypes.CLOSE_NEW_NOTE
  })
}

export const handleChange = (e) => dispatch => {
  const { name, value } = e.target
  // console.log('NEW NOTE CHANGE: ' + 'name: ' + name + ' value: ' + value)

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
  console.log(state.marks.currentMark)
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
  // console.log('Destroying Mark: ' + id)
  services.notes.destroy(id, (e) => {
    console.log('NOTE Destroyed: ' + id)
    console.log('NOTE FOR MarkId: '. markId)
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
