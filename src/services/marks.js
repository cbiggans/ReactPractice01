import { db } from './'

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
    const marks = []

    this.collection.get()
    .then((snapshotDocs) => {
      // Need to wait for this to completely finish, resolve only on last one
      // Because the function getNotes runs asynchronously, this needs to store
      //  all the promises in an array then wait for all of them to resolve
      //  before continuing. This is needed because we're trying to retreive
      //  all of the data we need before continuing to simulate a relational db
      // I probably shouldn't sync the data, but instead just get the data as needed then send it
      // Call from the action to load in the notes separately
      //  Can do conditional rendering from there
      // TODO XXX: Want to remove most of this, call the notes service to grab the notes
      //  Call action to grab the notes, should do this asynchronously
      let promises = []
      snapshotDocs.forEach((doc) => {
        promises.push(new Promise(resolve => {
          this.getNotes(doc)
          .then((mark) => {
            mark.id = doc.id
            resolve(mark)
            marks.push(mark)
          })
        }))
      })

      Promise.all(promises).then(() => {
        // console.log('Promise.all COMPLETE------------------------------')
        onSuccess(marks)
      })

    })
    .then(() => {
      // return marks
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
    this.collection.add(mark)
    .then((ref) => {
      mark.id = ref.id
      onSuccess(mark)
    })
  }

  update(id, markData, onSuccess) {
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
