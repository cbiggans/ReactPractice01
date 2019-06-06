import actionTypes from '../constants'

const initialState = {
  newNote: {
    type: '',
    text: '',
    category: '',
    timestamp: 0, // Time in seconds
  }, 
  mapping: {},    // key: markId, value: array
              //  This is done to help with Lazy-Loading & the NoSQL database relations
}

const notes = (state = initialState, action) => {
  var newNotes = {}
  var notesMap = {}
  var note, markId

  switch(action.type) {
    case actionTypes.OPEN_NEW_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNote: {
          ...state.newNote,
          timestamp: action.payload.timestamp,
        }
      }
    case actionTypes.LOAD_NOTE:
      console.log('LOADING NEW NOTE--------')
      note = action.payload.note
      markId = note.markId

      notesMap = Object.assign({}, state.mapping)

      if(!(markId in notesMap)) {
        notesMap[markId] = []
      }
      notesMap[markId].push(note)
      console.log('Notes: ', notesMap)

      return {
        ...state,
        mapping: notesMap,
      }
    case actionTypes.CHANGE_NEW_NOTE:
      console.log('CHANGING NEW NOTE--------')
      return {
        ...state,
        newNote: {
          ...state.newNote,
          text: action.payload.text,
        }
      }
    case actionTypes.CREATE_NEW_NOTE:
      console.log('CREATING_NEW_NOTE-------')
      
      notesMap = Object.assign({}, state.mapping)

      if(!(action.payload.markId in notesMap)) {
        notesMap[action.payload.markId] = []
      }

      notesMap[action.payload.markId].push(action.payload.note)

      console.log('Notes: ', notesMap)
      return {
        ...state,
        mapping: notesMap,
      }
    default:
      return state
  }
}

export default notes
