import { db } from './'

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
    this.collection.add(note)
    .then((ref) => {
      note.id = ref.id
      onSuccess(note)
    })
  }
}

export default NoteService
