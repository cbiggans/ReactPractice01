import actionTypes from './constants'


// Need to add thunk in order for this to work
/*
 *  See the importance of thunk here because we wantto be able to define these
 *  functions elsewhere and it's cleaner for the mapDispatchToProps if the
 *  dispatch is provided something like this
 */
export const handleSubmit = (e) => dispatch => {
  e.preventDefault()
  console.log('form submitted')
  dispatch({
    type: actionTypes.ADD_NEXT_MARK,
  })
}

export const handleChange = (e) => dispatch => {
  const { name, value } = e.target
  console.log('changing ' + name + ' to ' + value)
  dispatch({
    type: actionTypes.UPDATE_MARK_FIELD,
    payload: {
      name: name,
      value: value,
    }
  })
}

export const markActions = {
  handleChange: handleChange,
  handleSubmit: handleSubmit,
}
