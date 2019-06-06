import actionTypes from './constants'
import services from './services/'


// Need to add thunk in order for this to work
/*
 *  See the importance of thunk here because we wantto be able to define these
 *  functions elsewhere and it's cleaner for the mapDispatchToProps if the
 *  dispatch is provided something like this
 */
export const handleSubmit = (e) => (dispatch, getState) => {
  e.preventDefault()
  // console.log('form submitted')
  // console.log(services)

  const state = getState()
  services.marks.create(state.marks.nextMark, (mark) => {
    dispatch({
      type: actionTypes.ADD_NEXT_MARK,
      payload: {
        'mark': mark
      }
    })
  })
}

export const handleChange = (e) => dispatch => {
  const { name, value } = e.target
  // console.log('changing ' + name + ' to ' + value)
  dispatch({
    type: actionTypes.UPDATE_MARK_FIELD,
    payload: {
      name: name,
      value: value,
    }
  })
}

export const load = (e) => dispatch => {
  // console.log('Fetching Marks')
  services.marks.index((marks) => {
    marks.map(mark => {
      dispatch({
        type: actionTypes.LOAD_MARK,
        payload: {
          mark: mark,
        }
      })
    })
  })
}

export const fetchNotes = (markId) => dispatch => {
  services.notes.index([markId], (notes) => {
    notes.map(note => {
      dispatch({
        type: actionTypes.LOAD_NOTE,
        payload: {
          note: note
        }
      })
    })
  })
}

export const setCurrentMark = (id) => dispatch => {
  // console.log('Getting Mark: ' + id)
  services.marks.get(id, (mark) => {
    dispatch({
      type: actionTypes.SET_CURRENT_MARK,
      payload: {
        mark: mark,
      }
    })
  })
}
  

export const destroy = (id) => dispatch => {
  // console.log('Destroying Mark: ' + id)
  services.marks.destroy(id, (e) => {
    console.log('Mark Destroyed: ' + id)
    dispatch({
      type: actionTypes.DESTROY_MARK,
      payload: {
        id: id,
      }
    })
  })
}

export const openNewNote = () => dispatch => {
  var timestamp = window['YT'].get('player').getCurrentTime()

  // console.log('Open Note Editor')
  dispatch({
    type: actionTypes.OPEN_NEW_NOTE,
    payload: {
      timestamp: timestamp,
    }
  })
}

export const handleNewNoteChange = (e) => dispatch => {
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

export const handleNewNoteSubmit = (e) => (dispatch, getState) => {
  const { name, value } = e.target
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

export const markActions = {
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  load: load,
  fetchNotes: fetchNotes,
  setCurrentMark: setCurrentMark,
  destroy: destroy,
  openNewNote: openNewNote,
  handleNewNoteChange: handleNewNoteChange,
  handleNewNoteSubmit: handleNewNoteSubmit,
}
