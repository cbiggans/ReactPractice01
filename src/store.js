import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import markSessions from './reducers/markSessions'
import marks from './reducers/marks'
import notes from './reducers/notes'
import noteTakerSettings from './reducers/noteTakerSettings'


const rootReducer = combineReducers({
  markSessions,
  marks,
  notes,
  noteTakerSettings,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
                          composeEnhancers(applyMiddleware(thunk)))

export default store
