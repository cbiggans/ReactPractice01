import BaseService from './BaseService'

/*
{
  id: '',
  title: 'RecentlyCreated',
  searchTerm: '',
  order: 'descending',
  maxTotal: 10,
}
*/

class MarkWidgetService extends BaseService {
  constructor() {
    super('markWidgets')
  }
}

export default MarkWidgetService
