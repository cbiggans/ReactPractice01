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
  }

  index(onSuccess) {
    this.db.collection(this.collectionName).get()
    .then((snapshotDocs) => {
      console.log('loading ' + snapshotDocs)
      const marks = []
      snapshotDocs.forEach((doc) => {
        const mark = doc.data()
        mark.id = doc.id
        marks.push(mark)
      })

      console.log('Marks Retreived: ' + marks)
      onSuccess(marks)
    })
  }
}


const services = {
	marks: new MarkService()
}

export default services
