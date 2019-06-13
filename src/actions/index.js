import markSessionActions from './markSessions'
import markActions from './marks'
import noteActions from './notes'
import videoActions from './videos'


const actions = {
  markSessions: markSessionActions,
  marks: markActions, 
  notes: noteActions,
  videos: videoActions,
}

export default actions
