import { createStore } from 'redux'

const initialState = {
  marks: [{
    'category': 'Video',
    'description': 'This is a video',
    'tags': 'react, tutorial, redux',
    'title': 'This is a React Tutorial',
    'type': 'Youtube',
    'url': 'https://www.youtube.com/watch?v=93p3LxR9xfM&t=2467s',
  }],
  nextMark: {
    'category': '',
    'description': '',
    'tags': '',
    'title': '',
    'type': '',
    'url': '',
  }
}

const reducers = (state=initialState, action) => {
  return state
}

const store = createStore(reducers)

export default store
