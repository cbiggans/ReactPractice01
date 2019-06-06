import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import actionTypes from './constants'
import marks from './reducers/marks'
import notes from './reducers/notes'
import noteTakerSettings from './reducers/noteTakerSettings'


const rootReducer = combineReducers({
  marks,
  notes,
  noteTakerSettings,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
