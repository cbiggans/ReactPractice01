import { buildWhereClause } from '../lib/searchTerms'
import BaseService from './BaseService'
import services from './'


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
    let promises
    let parentPromises

    if(widget.markGroupIds) {
      parentPromises = []
      widget.markGroupIds.forEach((markGroupId) => {
        parentPromises.push(new Promise((parentResolve) => {
          services.markGroups.get(markGroupId, (markGroup) => {

            promises = []
            markGroup.markIds.forEach((markId) => {
              promises.push(new Promise((resolve) => {
                this.get(markId, resolve)
              }))
            })
            Promise.all(promises)
            .then((marks) => {
              parentResolve(marks)
            })
          })
        }))
      })
      Promise.all(parentPromises)
      .then((marks) => {
        var result = []
        marks.forEach((marks) => {
          result = result.concat(marks)
        })
        callback(result)
      })
    } else {
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
}

export default MarkService
