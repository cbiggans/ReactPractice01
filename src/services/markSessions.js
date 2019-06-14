import { db } from './'
import { currentUTCTime } from '../lib/time'


class MarkSessionService {
  constructor() {
    this.collectionName = 'markSessions'
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  // TODO XXX: Should probably change onSuccess to callback
  index(onSuccess) {
    this.collection.get()
    .then((snapshotDocs) => {
      const markSessions = []
      let markSession

      snapshotDocs.forEach((doc) => {
        markSession = Object.assign({}, doc.data())
        markSession.id = doc.id
        markSessions.push(markSession)
      })
      return markSessions
    })
    .then((markSessions) => {
      onSuccess(markSessions)
      return markSessions
    })
  }

  get(id, callback) {
    this.collection.doc(id).get()
    .then((docRef) => {
      const session = Object.assign(docRef.data())
      session.id = docRef.id

      callback(session)
    })
  }

  create(markSession, onSuccess) {
    markSession.created = currentUTCTime()
    markSession.modified = currentUTCTime()

    this.collection.add(markSession)
    .then((ref) => {
      markSession.id = ref.id
      onSuccess(markSession)
    })
  }

  update(id, data, callback) {
    data.modified = currentUTCTime()

    this.collection.doc(id).update(data)
    .then((e) => {
      callback(data)
    })
  }
}

export default MarkSessionService
