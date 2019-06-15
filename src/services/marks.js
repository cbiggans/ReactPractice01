import { db } from './'
import { currentUTCTime } from '../lib/time'
import { parseSearchTerm } from '../lib/searchTerms'


class MarkService {
	constructor() {
    this.collectionName = 'marks'
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  // getNotes(doc) {
  //   // Returns a Promise
  //   let note
  //   let notes = []

  //   return new Promise(resolve => {
  //     this.collection.doc(doc.id).collection('notes').get()
  //     .then((noteSnapshotDocs) => {
  //       if(noteSnapshotDocs && noteSnapshotDocs.docs.length > 0) {
  //         noteSnapshotDocs.forEach((noteDoc) => {
  //           note = noteDoc.data()
  //           note.id = noteDoc.id
  //           notes.push(note)
  //         })
  //       }
  //       return notes
  //     })
  //     .then((notes) => {
  //       let mark = Object.assign({id: doc.id, notes: notes}, doc.data())
  //       resolve(mark)
  //     })
  //   })
  // }

  getFromWidget(widget, callback) {
    // Uses where term based on widget
    // widget.searchTerm
    // widget.order
    // widget.maxTotal
    // e.g. searchTerm -> ''
    // e.g. searchTerm -> domain:youtube
    // const key, value
    const maxTotal = widget.maxTotal || 10
    const order = widget.order || 'descending'
    const orderBy = widget.order || 'created'
    // const comparisonOp = '=='
    const {left, op, right} = parseSearchTerm(widget.searchTerm)
    console.log(left)
    console.log(op)
    console.log(right)
    debugger
    // TODO XXX: Will need to add things like domain and such to firestore in order
    //  to search by it, firestore doesn't support substrings

    // if(widget.searchTerm) {
    //   key,value = widget.searchTerm.split(':')
    // }

    // this.collection.where()

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
      const mark = Object.assign(docRef.data())
      mark.id = id
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
