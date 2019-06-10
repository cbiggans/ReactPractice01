import { db } from './'
import { currentUTCTime } from '../lib/time'

class NoteService {
	constructor() {
    this.collectionName = 'notes'
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  index(markIds, onSuccess) {
    var note
    var notes = []

    this.collection.where('markId', '==', markIds[0]).get()
    .then((noteSnapshotDocs) => {
        noteSnapshotDocs.forEach((noteDoc) => {
          note = noteDoc.data()
          note.id = noteDoc.id
          notes.push(note)
        })

        onSuccess(notes)
    })
  }

  create(markId, note, onSuccess) {
    note.markId = markId
    note.timestampCreatedAt = currentUTCTime()
    note.timestampModifiedAt = currentUTCTime()
    this.collection.add(note)
    .then((ref) => {
      note.id = ref.id
      onSuccess(note)
    })
  }

  update(note, onSuccess) {
    this.collection.doc(note.id).update(note)
    .then((e) => {
      onSuccess(e)
    })
  }

  destroy(id, onSuccess) {
    // NOTE: Does not delete sub collections
    this.collection.doc(id).delete()
    .then((e) => onSuccess(e))
  }
}

export default NoteService
