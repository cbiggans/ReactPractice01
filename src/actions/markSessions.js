import actionTypes from './constants'


export const handleChange = (e, id) => dispatch => {
  const { name, value } = e.target

  console.log('Name,Value: ' + name + ',' + value)
  dispatch({
    type: actionTypes.MARK_SESSIONS.UPDATE_FIELD,
    payload: {
      name: name,
      value: value,
      id: id,
    }
  })
}

const markSessionActions = {
  handleChange: handleChange,
}

export default markSessionActions
