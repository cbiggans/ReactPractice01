import markSessionActions from './markSessions'
import markWidgetActions from './markWidgets'
import markActions from './marks'
import noteActions from './notes'
import videoActions from './videos'


const actions = {
  markSessions: markSessionActions,
  markWidgets: markWidgetActions,
  marks: markActions, 
  notes: noteActions,
  videos: videoActions,
}

export default actions
