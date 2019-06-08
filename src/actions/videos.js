import actionTypes from './constants'


export const setVideoTime = (timestamp) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_VIDEO_TIME,
    payload: {
      currentTime: timestamp,
    }
  })
}

export const updateSettings = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_SETTINGS,
    payload: {
      data: data,
    }
  })
}

export const completedTimeUpdate = () => (dispatch) => {
  dispatch({
    type: actionTypes.COMPLETED_TIME_UPDATE
  })
}

const videoActions = {
  setVideoTime: setVideoTime,
  completedTimeUpdate: completedTimeUpdate,
  updateSettings: updateSettings,
}

export default videoActions
