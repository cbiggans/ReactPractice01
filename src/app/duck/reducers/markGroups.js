import actionTypes from '../actions/constants'


// const emptyMarkGroup = {
// 
// }

const initialState = {
  collection: {},
}


const markGroups = (state = initialState, action) => {
  let newCollection

  switch(action.type) {
    case actionTypes.MARK_GROUPS.CREATE:
      newCollection = Object.assign({}, state.collection)
      newCollection[action.payload.markGroup.id] = action.payload.markGroup

      return {
        ...state,
        collection: newCollection
      }
    default:
      return state
  }
}

export default markGroups
