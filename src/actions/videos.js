import actionTypes from './constants'
import { dispatch } from 'redux'


export const setVideoTime = (timestamp) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_VIDEO_TIME,
    payload: {
      currentTime: timestamp,
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
}

export default videoActions
