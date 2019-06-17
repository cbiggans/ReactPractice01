import { buildWhereClause } from '../lib/searchTerms'
import BaseService from './BaseService'


class MarkService extends BaseService {
	constructor() {
    super('marks')
  }

  indexFromWidget(widget, callback) {
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
      // TODO XXX: This is common, should put this into another function
      snapshotDocs.forEach((doc) => {
        mark = doc.data()
        mark.id = doc.id

        marks.push(mark)
      })
      callback(marks)
      return marks
    })

  }
}

export default MarkService
