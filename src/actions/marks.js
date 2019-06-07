import actionTypes from './constants'
import services from '../services/'


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
      return mark
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

const markActions = {
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  load: load,
  setCurrentMark: setCurrentMark,
  destroy: destroy,
}

export default markActions
