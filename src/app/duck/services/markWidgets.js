import BaseService from './BaseService'


class MarkWidgetService extends BaseService {
  constructor() {
    super('markWidgets')
  }

  index(markSessionId, callback) {
    this.collection.where('markSessionIds', 'array-contains', markSessionId)
    .get()
    .then((snapshotDocs) => {
      const objList = []
      let item

      snapshotDocs.forEach((doc) => {
        item = Object.assign({}, doc.data())
        item.id = doc.id
        objList.push(item)
      })
      return objList
    })
    .then((objList) => {
      callback(objList)
      return objList
    })
  }
}

export default MarkWidgetService
