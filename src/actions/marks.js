import actionTypes from './constants'
import services from '../services/'


/*
 *  See the importance of thunk here because we wantto be able to define these
 *  functions elsewhere and it's cleaner for the mapDispatchToProps if the
 *  dispatch is provided something like this
 */
export const handleSubmit = (e) => (dispatch, getState) => {
  e.preventDefault()

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
  dispatch({
    type: actionTypes.UPDATE_MARK_FIELD,
    payload: {
      name: name,
      value: value,
    }
  })
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
}

export default markActions
