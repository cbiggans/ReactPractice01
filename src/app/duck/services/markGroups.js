import BaseService from './BaseService'

/*
MarkGroup = {
  id: <id>,
  title: <title>,
  description: <description>,
  tags: [<tag>, ...],
  markIds: [<mark_id>, ...],
}
*/
class MarkGroupService extends BaseService {
  constructor() {
    super('markGroups')
  }
}

export default MarkGroupService
