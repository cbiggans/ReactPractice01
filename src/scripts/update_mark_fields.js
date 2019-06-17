// export const addDomainField = (services) => {
//   var mark
// 
//   services.marks.collection.get()
//   .then((markSnapshotDocs) => {
//     markSnapshotDocs.forEach((markDoc) => {
//       mark = markDoc.data()
//       var url = new URL(mark.url)
//       var domain
// 
//       if(url.hostname.includes('www.')) {
//         domain = url.hostname.split('www.')[1]
//       } else {
//         domain = url.hostname
//       }
// 
//       mark.details = {
//         domain: domain
//       }
//       console.log(mark.details)
// 
//       // if(mark.CreatedAt) {
//       //   mark.created = mark.CreatedAt
//       // } else if(mark.createdAt) {
//       //   mark.created = mark.createdAt
//       // }
// 
//       console.log('Mark To Update: ', mark)
//       services.marks.update(markDoc.id, mark, (mark) => {
//         console.log('Mark Updated: ', mark)
//       })
//     })
//   })
// }

// const updateMarkFields = () => {
//   var mark
// 
//   services.marks.collection.get()
//   .then((markSnapshotDocs) => {
//     markSnapshotDocs.forEach((markDoc) => {
//       mark = markDoc.data()
// 
//       if(mark.CreatedAt) {
//         mark.created = mark.CreatedAt
//       } else if(mark.createdAt) {
//         mark.created = mark.createdAt
//       }
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


