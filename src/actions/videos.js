import actionTypes from './constants'


export const setVideoTime = (timestamp) => (dispatch) => {
  dispatch({
    type: actionTypes.NOTE_TAKER.SET_VIDEO_TIME,
    payload: {
      currentTime: timestamp,
    }
  })
}

export const updateSettings = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.NOTE_TAKER.UPDATE_SETTINGS,
    payload: {
      data: data,
    }
  })
}

export const completedTimeUpdate = () => (dispatch) => {
  dispatch({
    type: actionTypes.NOTE_TAKER.COMPLETED_TIME_UPDATE
  })
}

const videoActions = {
  setVideoTime: setVideoTime,
  completedTimeUpdate: completedTimeUpdate,
  updateSettings: updateSettings,
}

export default videoActions
