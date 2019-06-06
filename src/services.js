import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
	apiKey: "AIzaSyBQbPqLqlmMEmI6vPQvIbCO44d_OES8YhI",
	authDomain: "test-project-02-cd5ac.firebaseapp.com",
	databaseURL: "https://test-project-02-cd5ac.firebaseio.com",
	projectId: "test-project-02-cd5ac",
	storageBucket: "test-project-02-cd5ac.appspot.com",
	messagingSenderId: "621754166314",
	appId: "1:621754166314:web:2b20b2a0231b243a"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

class MarkService {
	constructor() {
    this.collectionName = 'marks'
    this.db = db
    this.collection = this.db.collection(this.collectionName)

    // this.index = this.index.bind(this)
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
      let promises = []
      snapshotDocs.forEach((doc) => {
        promises.push(new Promise(resolve => {
          this.getNotes(doc)
          .then((mark) => {
            console.log('Mark: ', mark)
            resolve(mark)
            marks.push(mark)
          })
        }))
      })

      Promise.all(promises).then(() => {
        console.log('Promise.all COMPLETE------------------------------')
        console.log('Marks: ', marks)
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

  createNote(markId, note, onSuccess) {
    this.collection.doc(markId).collection('notes').add(note)
    .then((ref) => {
      note.id = ref.id
      onSuccess(note)
    })
  }

  update(id, markData, onSuccess) {
    // Get mark ref, then update it
    this.collection.doc(id).update(markData)
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


const services = {
	marks: new MarkService()
}

export default services
