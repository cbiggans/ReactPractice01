import services from '../services/'

// const updateFields = () => {
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
// updateFields()

export default updateFields
