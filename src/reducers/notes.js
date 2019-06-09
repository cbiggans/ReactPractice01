import actionTypes from '../actions/constants'

const initialState = {
  newNote: {
    type: '',
    text: '',
    category: '',
    timestamp: 0, // Time in seconds
  }, 
  newBookmark: {
    type: 'bookmark',
    text: 'BOOKMARK',
    category: 'bookmark',
    timestamp: 0, // Time in seconds
  }, 
  settings: {
    listOrder: 'descending',   // Other value is descending
  },
  mapping: {},    // key: markId, value: array
              //  This is done to help with Lazy-Loading & the NoSQL database relations
}

const notes = (state = initialState, action) => {
  var notesMap = {}
  var notesList = []
  var note, markId

  switch(action.type) {
    case actionTypes.CHANGE_NOTE_ORDER:
      // NEED markId to get into mapping
      notesList = state.mapping[action.payload.markId].slice()

      notesList.sort((a, b) => {
        if(action.payload.order === 'descending') {
          return b.timestamp - a.timestamp
        } else {
          return a.timestamp - b.timestamp
        }
      })

      var newState = {
        ...state,
        mapping: {
          ...state.mapping,
          [action.payload.markId]: notesList,
        },
        settings: {
          ...state.settings,
          listOrder: action.payload.order,
        }
      }

      return newState
    case actionTypes.OPEN_NEW_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNote: {
          ...state.newNote,
          timestamp: action.payload.timestamp,
        }
      }
    case actionTypes.CLOSE_NEW_NOTE:
      return {
        ...state,
        newNote: Object.assign({}, initialState.newNote)
      }
    case actionTypes.LOAD_NOTE:
      note = action.payload.note
      note.key = note.id
      markId = note.markId

      notesMap = Object.assign({}, state.mapping)

      if(!(markId in notesMap)) {
        notesMap[markId] = []
      } else {
        notesMap[markId] = notesMap[markId].slice()
      }

      if(notesMap[markId].filter((item) => {return item.id === note.id}).length === 0) {
        notesMap[markId].push(note)

        notesMap[markId].sort((a, b) => {
          if(state.settings.listOrder === 'descending') {
            return b.timestamp - a.timestamp
          } else {
            return a.timestamp - b.timestamp
          }
        })
      }

      return {
        ...state,
        mapping: notesMap,
      }
    case actionTypes.CHANGE_NEW_NOTE:
      {}
      return {
        ...state,
        newNote: {
          ...state.newNote,
          [action.payload.name]: action.payload.value,
        }
      }
    // Maybe characterize this as SUBMIT? Create may give impression
    //  that it's just being created in database and not from a form
    case actionTypes.CREATE_NEW_NOTE:
      
      notesMap = Object.assign({}, state.mapping)

      if(!(action.payload.markId in notesMap)) {
        notesMap[action.payload.markId] = []
      }

      // This needs to be put into a function, it's written at least 3 times
      notesMap[action.payload.markId].push(action.payload.note)
      notesMap[action.payload.markId].sort((a, b) => {
        if(state.settings.listOrder === 'descending') {
          return b.timestamp - a.timestamp
        } else {
          return a.timestamp - b.timestamp
        }
      })

      return {
        ...state,
        mapping: notesMap,
        newNote: Object.assign({}, initialState.newNote)
      }
    case actionTypes.DESTROY_NOTE:
      notesMap = Object.assign({}, state.mapping)
      notesList = notesMap[action.payload.markId]

      notesList = notesList.filter((item) => {
        return item.id !== action.payload.id
      })
      notesMap[action.payload.markId] = notesList

      return {
        ...state,
        mapping: notesMap
      }
    default:
      return state
  }
}

export default notes
