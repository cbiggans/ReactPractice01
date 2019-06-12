// TODO XXX: Should separate these into sections By Resource
const actionTypes = {
  MARKS: {
    ADD_MARK: 'ADD_MARK',
    ADD_NEXT_MARK: 'ADD_NEXT_MARK',
    UPDATE_MARK_FIELD: 'UPDATE_MARK_FIELD',
    UPDATE_MARK: 'UPDATE_MARK',
    LOAD_MARK: 'LOAD_MARK',
    LOAD_MARKS: 'LOAD_MARKS',
    DESTROY_MARK: 'DESTROY_MARK',
    OPEN_MANY_MARK_INPUT: 'OPEN_MANY_MARK_INPUT',
    CLOSE_MANY_MARK_INPUT: 'CLOSE_MANY_MARK_INPUT',
    CLEAR_MANY_MARK_INPUT: 'CLEAR_MANY_MARK_INPUT',
    UPDATE_MANY_MARK_INPUT: 'UPDATE_MANY_MARK_INPUT',
    SUBMIT_MANY_MARK_INPUT: 'SUBMIT_MANY_MARK_INPUT',
    EDIT_MARK: 'EDIT_MARK',
    CLOSE_MARK_FORM: 'CLOSE_MARK_FORM',
    SET_CURRENT_MARK: 'SET_CURRENT_MARK',
  },
  NOTES: {
    LOAD_NOTE: 'LOAD_NOTE',
    OPEN_NEW_NOTE: 'OPEN_NEW_NOTE',
    EDIT_NOTE: 'EDIT_NOTE',
    CLOSE_NEW_NOTE: 'CLOSE_NEW_NOTE',
    CHANGE_NEW_NOTE: 'CHANGE_NEW_NOTE', // TODO XXX: Should be handleChange
    CREATE_NEW_NOTE: 'CREATE_NEW_NOTE',
    UPDATE_NOTE: 'UPDATE_NOTE',
    DESTROY_NOTE: 'DESTROY_NOTE',
  },
  NOTE_TAKER: {
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    SET_VIDEO_TIME: 'SET_VIDEO_TIME',
    COMPLETED_TIME_UPDATE: 'COMPLETED_TIME_UPDATE',
    CHANGE_NOTE_ORDER: 'CHANGE_NOTE_ORDER',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  }
}

export default actionTypes
