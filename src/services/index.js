import firebase from 'firebase/app'
import 'firebase/firestore'
import MarkService from './marks'
import NoteService from './notes'


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

export const db = firebase.firestore()


const services = {
	marks: new MarkService(),
  notes: new NoteService(),
}

// const updateMarkFields = () => {
//   var mark
// 
//   services.marks.collection.get()
//   .then((markSnapshotDocs) => {
//     markSnapshotDocs.forEach((markDoc) => {
//       mark = markDoc.data()
// 
//       mark.accessTimes = []
//       mark.CreatedAt = Date.now()
//       mark.ModifiedAt = Date.now()
//       mark.DeletedAt = null
// 
//       console.log('Mark To Update: ', mark)
//       services.marks.update(markDoc.id, mark, (mark) => {
//         console.log('Mark Updated: ', mark)
//       })
//     })
//   })
// }
// 
// updateMarkFields()

// const updateNoteFields = () => {
//   var note
// 
//   services.notes.collection.get()
//   .then((noteSnapshotDocs) => {
//     noteSnapshotDocs.forEach((noteDoc) => {
//       note = noteDoc.data()
// 
//       note.id = noteDoc.id
//       note.timestampStart = note.timestamp
//       note.timestampEnd = null
//       note.timestampCreatedAt = Date.now()
//       note.timestampModifiedAt = Date.now()
//       note.timestampDeletedAt = null
// 
//       console.log('Note To Update: ', note)
//       services.notes.update(note, (note) => {
//         console.log('Note Updated: ', note)
//       })
//     })
//   })
// }
// 
// updateNoteFields()

// Update the markId on notes
// var newMarkId = 'bbw0qvi8TWizol1iojFq'
// services.notes.index(["C2TWsbjQ0nEoUk4UMVQ2"], (notes) => {
//   notes.map((note) => {
//     note.markId = newMarkId
//     services.notes.update(note, () => {})
//   })
// })

export default services
