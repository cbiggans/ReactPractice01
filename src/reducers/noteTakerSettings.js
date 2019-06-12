import actionTypes from '../actions/constants'


const initialState = {
  newNoteEditorOpen: false,
  currentVideoId: '',
  markType: '',   // values like 'youtube' or other sites
  eventMode: 'videoPlayback',   // Current mode for keypress events and such
  playback: {
    currentTime: 0,
    hasNewCurrentTime: false,
    shortJumpBackSeconds: -2,
    shortJumpForwardSeconds: 2,
    longJumpBackSeconds: -10,
    longJumpForwardSeconds: 10,
    playbackQuality: 'highres',
  }
}

const noteTakerSettings = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.NOTE_TAKER.UPDATE_SETTINGS:
      var playback = Object.assign({}, state.playback)
      if('currentTime' in action.payload.data) {
        playback.currentTime = action.payload.data.currentTime
      }
      return {
        ...state,
        playback: playback
      }
    case actionTypes.NOTE_TAKER.SET_VIDEO_TIME:
      return {
        ...state,
        playback: {
          ...state.playback,
          currentTime: action.payload.currentTime,
          hasNewCurrentTime: true,
        }
      }
    case actionTypes.NOTE_TAKER.COMPLETED_TIME_UPDATE:
      return {
        ...state,
        playback: {
          ...state.playback,
          hasNewCurrentTime: false,
        }
      }
    case actionTypes.NOTES.OPEN_NEW_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNoteEditorOpen: true,
        eventMode: 'newNote',
        playback: {
          ...state.playback,
          currentTime: action.payload.timestamp,
        }
      }
    case actionTypes.NOTES.EDIT_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNoteEditorOpen: true,
        eventMode: 'newNote', // TODO XXX: Make the value editNote mode instead
      }
    case actionTypes.NOTES.CLOSE_NEW_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNoteEditorOpen: false,
        eventMode: 'videoPlayback',
      }
    case actionTypes.NOTES.CREATE_NEW_NOTE:
    case actionTypes.NOTES.UPDATE_NOTE:
      return {
        ...state,
        newNoteEditorOpen: false,
        eventMode: 'videoPlayback',
      }
    default:
      return state
  }
}

export default noteTakerSettings
