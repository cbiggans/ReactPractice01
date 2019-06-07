import actionTypes from '../actions/constants'


const initialState = {
  newNoteEditorOpen: false,
  currentVideoId: '',
  type: '',   // values like 'youtube' or other sites
  eventMode: 'videoPlayback',   // Current mode for keypress events and such
  playback: {
    currentTime: 0,
    shortJumpBackSeconds: -2,
    shortJumpForwardSeconds: 2,
    longJumpBackSeconds: -10,
    longJumpForwardSeconds: 10,
    playbackQuality: 'highres',
  }
}

const noteTakerSettings = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.OPEN_NEW_NOTE: // Maybe add 'FLOW'?
      console.log('Open New Note')
      console.log('Entering newNote key mode')
      console.log(state)
      return {
        ...state,
        newNoteEditorOpen: true,
        eventMode: 'newNote',
        playback: {
          ...state.playback,
          currentTime: action.payload.timestamp,
        }
      }
    case actionTypes.CLOSE_NEW_NOTE: // Maybe add 'FLOW'?
      return {
        ...state,
        newNoteEditorOpen: false,
        eventMode: 'videoPlayback',
      }
    case actionTypes.CREATE_NEW_NOTE:
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
