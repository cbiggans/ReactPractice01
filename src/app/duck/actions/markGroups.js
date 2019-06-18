import actionTypes from './constants'
import services from '../services/'


// Thinking about whether to send markGroup or markIds in
//  I like sending markIds in because then I can create the entire markGroup
//  and control it's data here. However, I don't want to have to send in all
//  the other details, like title/description/etc, in through params through
//  this function because that would be long/harder to read
//  Possibly supply other functions that will create the markGroup, like a
//  factory method, that way the design/data of it can be controlled where it's
//  easier to manage but this create function can be as simple as possible
//  Would be nice to have a factory folder for this purpose
export const create = (newMarkGroup, callback) => (dispatch) => {
  services.markGroups.create(newMarkGroup, (markGroup) => {
    dispatch({
      type: actionTypes.MARK_GROUPS.CREATE,
      payload: {
        markGroup: markGroup,
      }
    })
    if(callback) {
      callback(markGroup)
    }
  })
}

const markGroupActions = {
  create: create,
}

export default markGroupActions
