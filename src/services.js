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
  }

  index(onSuccess) {
    this.collection.get()
    .then((snapshotDocs) => {
      console.log('loading ' + snapshotDocs)
      const marks = []

      snapshotDocs.forEach((doc) => {
        marks.push(Object.assign({id: doc.id}, doc.data()))
      })

      console.log('Num Marks Retreived: ' + marks.length)
      onSuccess(marks)
    })
  }

  get(id, onSuccess) {
    this.collection.doc(id).get()
    .then((docRef) => {
      onSuccess(docRef.data())
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
