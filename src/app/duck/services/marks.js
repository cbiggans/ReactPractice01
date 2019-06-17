import { db } from './'
import { currentUTCTime } from '../lib/time'
import { buildWhereClause } from '../lib/searchTerms'
import BaseService from './BaseService'


class MarkService extends BaseService {
	constructor() {
    super('marks')

    // this.collectionName = 'marks'
    // this.db = db
    // this.collection = this.db.collection(this.collectionName)
  }

  getFromWidget(widget, callback) {
    // Uses where term based on widget
    // widget.searchTerm
    // widget.order
    // widget.maxTotal
    // e.g. searchTerm -> ''
    // e.g. searchTerm -> domain:youtube
    // const key, value

    const maxTotal = parseInt(widget.maxTotal || 10)
    const orderBy = widget.orderBy || 'created'
    const marks = []
    let order = widget.order || 'descending'
    let mark

    const whereClause = buildWhereClause(widget.searchTerm)
    let query

    if(!whereClause.isEmpty) {
      query = this.collection.where(whereClause.left, whereClause.op, whereClause.right)
    } else {
      query = this.collection
    }

    if(order === 'descending') {
      query = query.orderBy(orderBy, 'desc')
    } else {
      query = query.orderBy(orderBy)
    }
    query = query.limit(maxTotal)

    query.get()
    .then((snapshotDocs) => {
      // This is common, should put this into another function
      snapshotDocs.forEach((doc) => {
        mark = doc.data()
        mark.id = doc.id
        marks.push(mark)
      })
      callback(marks)
      return marks
    })

  }

  index(onSuccess) {
    this.collection.get()
    .then((snapshotDocs) => {
      const marks = []
      let mark

      snapshotDocs.forEach((doc) => {
        mark = Object.assign({}, doc.data())
        mark.id = doc.id
        marks.push(mark)
      })
      return marks

    })
    .then((marks) => {
      onSuccess(marks)
      return marks
    })
  }

  get(id, onSuccess) {
    this.collection.doc(id).get()
    .then((docRef) => {
      const mark = Object.assign(docRef.data())
      mark.id = id
      onSuccess(mark)
    })
  }

  create(mark, onSuccess) {
    mark.created = currentUTCTime()
    mark.modified = currentUTCTime()

    this.collection.add(mark)
    .then((ref) => {
      mark.id = ref.id
      onSuccess(mark)
    })
  }

  update(id, markData, onSuccess) {
    markData.modifiedAt = currentUTCTime()

    debugger
    // Get mark ref, then update it
    this.collection.doc(id).update(markData)
    .then((e) => {
       onSuccess(markData)
    })
  }

  // destroy(id, callback) {
  //   // NOTE: Does not delete sub collections
  //   this.collection.doc(id).delete()
  //   .then((e) => callback(e))
  // }
}

export default MarkService
