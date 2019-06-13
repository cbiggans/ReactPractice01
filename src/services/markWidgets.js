import { db } from './'


/*
{
  id: '',
  title: 'RecentlyCreated',
  searchTerm: '',
  order: 'descending',
  maxTotal: 10,
}
*/

class MarkWidgetService {
  constructor() {
    this.collectionName = 'markWidgets'
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  index(onSuccess) {
    this.collection.get()
    .then((snapshotDocs) => {
      const markWidgets = []
      let markWidget

      snapshotDocs.forEach((doc) => {
        markWidget = doc.data()
        markWidget.id = doc.id
        markWidgets.push(markWidget)
      })
      return markWidget
    })
    .then((markWidgets) => {
      onSuccess(markWidgets)
      return markWidgets
    })
  }

  create(markWidget, onSuccess) {
    this.collection.add(markWidget)
    .then((ref) => {
      markWidget.id = ref.id
      onSuccess(markWidget)
    })
  }
}

export default MarkWidgetService
