import actionTypes from './constants'
import services from './services'


// Need to add thunk in order for this to work
/*
 *  See the importance of thunk here because we wantto be able to define these
 *  functions elsewhere and it's cleaner for the mapDispatchToProps if the
 *  dispatch is provided something like this
 */
export const handleSubmit = (e) => dispatch => {
  e.preventDefault()
  console.log('form submitted')
  console.log(services)

  // services.marks.collection('marks').add

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

export const fetch = (e) => dispatch => {
  console.log('Fetching Marks')
  services.marks.index((marks) => {
    dispatch({
      type: actionTypes.LOAD_MARKS,
      payload: {
        'marks': marks,
      }
    })
  })
}

export const markActions = {
  handleChange: handleChange,
  handleSubmit: handleSubmit,
  fetch: fetch,
}
