import actionTypes from './constants'
import services from '../services/'
import markActions from './marks'


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

export const createWithUrls = (urls, callback) => (dispatch) => {

    // TODO XXX: Should have `createGroup` action
    // Create Marks from manyMarkInputter in services
    const promises = []
    urls.forEach((url) => {
      promises.push(new Promise((resolve) => {
          dispatch(markActions.createThroughURL(url, resolve))
        })
      )
    })

    Promise.all(promises)
    .then((marks) => {
      let markIds = marks.map((mark) => {
        return mark.id
      })

      // TODO XXX: Generate markGroup from factory
      //  Allows me to control how the data looks on creation
      let markGroup = {
        title: '',
        description: '',
        tags: [],
        markIds: markIds,
      }

      dispatch(markGroupActions.create(markGroup, callback))
    })
}

const markGroupActions = {
  create: create,
  createWithUrls: createWithUrls,
}

export default markGroupActions
