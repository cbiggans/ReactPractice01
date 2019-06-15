import React from 'react'
import MarkWidgetItem from './MarkWidgetItem'


function MarkWidgetList(props) {
  const widgetItems = []
  Object.values(props.collection).forEach((item) => {
    widgetItems.push(<MarkWidgetItem key={item.id} widget={item} />)
  })
  return (
    <div>
      <h3>List</h3>
      {widgetItems}
    </div>
  )
}

export default MarkWidgetList