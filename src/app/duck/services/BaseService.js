import { db } from './'
import { currentUTCTime } from '../lib/time'


class BaseService {
  constructor(collectionName) {
    this.collectionName = collectionName
    this.db = db
    this.collection = this.db.collection(this.collectionName)
  }

  index(callback) {
    this.collection.get()
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
  
  get(id, callback) {
    this.collection.doc(id).get()
    .then((docRef) => {
      const item = Object.assign(docRef.data())
      item.id = docRef.id

      callback(item)
    })
  }

  create(item, callback) {
    item.created = currentUTCTime()
    item.modified = currentUTCTime()

    this.collection.add(item)
    .then((ref) => {
      item.id = ref.id
      callback(item)
    })
  }

  update(id, data, callback) {
    data.modified = currentUTCTime()

    this.collection.doc(id).update(data)
    .then((e) => {
      callback(data)
    })
  }

  destroy(id, callback) {
    // NOTE: Does not delete sub collections
    this.collection.doc(id).delete()
    .then((e) => callback(e))
  }
}

export default BaseService
