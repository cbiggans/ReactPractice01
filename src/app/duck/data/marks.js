/*
  Has all the definitions of the data and validators for making sure things
  are kept correct

*/

export const INITIAL_MARK = {
  'category': '',
  'description': '',
  'tags': '',
  'title': '',
  'type': '',
  'url': '',
  'id': '',
}

// TODO XXX: Should have initial property of 'loadStatus' to prevent double loading
//  Probably should have `settings` property on parent object
export const INITIAL_COLLECTION = {}

export const INITIAL_ORDERED_IDS = []

export const INITIAL_MARK_INPUTTER = ''

export const INITIAL_DISPLAY_SETTINGS = {
  manyMarkInputIsOpen: false,
  // Recommend not using state for redux: https://github.com/reduxjs/redux/issues/1499
  // TODO XXX: editing should not be in DisplaySettings, should be a top property & have the
  //  inProgress editing
}

export const INITIAL_EDITING = {
  'nextMark': Object.assign({}, INITIAL_MARK),
}


export const markDataConstants = {
  INITIAL_MARK, INITIAL_COLLECTION, INITIAL_ORDERED_IDS, INITIAL_DISPLAY_SETTINGS, INITIAL_EDITING
}

export default markDataConstants
