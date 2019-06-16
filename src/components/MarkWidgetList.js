import React from 'react'
import MarkWidgetWindow from './MarkWidgetWindow'


function MarkWidgetList(props) {
  const widgetWindows = []
  Object.values(props.collection).forEach((item) => {
    widgetWindows.push(<MarkWidgetWindow key={item.id}
                                         widget={item}
                                         markIdOrder={props.markIdOrderMap[item.id]}
                                         markCollection={props.markCollection} />)
  })
  return (
    <div>
      <h3>List</h3>
      {widgetWindows}
    </div>
  )
}

export default MarkWidgetList
