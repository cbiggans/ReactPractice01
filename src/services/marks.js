import { db } from './'
import { currentUTCTime } from '../lib/time'


class MarkService {
	constructor() {
    this.collectionName = 'marks'
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  getNotes(doc) {
    // Returns a Promise
    let note
    let notes = []

    return new Promise(resolve => {
      this.collection.doc(doc.id).collection('notes').get()
      .then((noteSnapshotDocs) => {
        if(noteSnapshotDocs && noteSnapshotDocs.docs.length > 0) {
          noteSnapshotDocs.forEach((noteDoc) => {
            note = noteDoc.data()
            note.id = noteDoc.id
            notes.push(note)
          })
        }
        return notes
      })
      .then((notes) => {
        let mark = Object.assign({id: doc.id, notes: notes}, doc.data())
        resolve(mark)
      })
    })
  }

  index(onSuccess) {
    this.collection.get()
    .then((snapshotDocs) => {
      const marks = []
      let mark

      snapshotDocs.forEach((doc) => {
        mark = Object.assign({}, doc.data())
        mark.id = doc.id
        marks.push(mark)
      })
      return marks

    })
    .then((marks) => {
      onSuccess(marks)
      return marks
    })
  }

  get(id, onSuccess) {
    this.collection.doc(id).get()
    .then((docRef) => {
      const mark = Object.assign({id: id}, docRef.data())
      onSuccess(mark)
    })
  }

  create(mark, onSuccess) {
    mark.createdAt = currentUTCTime()
    mark.modifiedAt = currentUTCTime()

    this.collection.add(mark)
    .then((ref) => {
      mark.id = ref.id
      onSuccess(mark)
    })
  }

  update(id, markData, onSuccess) {
    markData.modifiedAt = currentUTCTime()

    // Get mark ref, then update it
    this.collection.doc(id).update(markData)
    .then((e) => {
       onSuccess(markData)
    })
  }

  destroy(id, onSuccess) {
    // NOTE: Does not delete sub collections
    this.collection.doc(id).delete()
    .then((e) => onSuccess(e))
  }
}

export default MarkService
