import React from 'react'
import MarkSessionItem from './MarkSessionItem'


function MarkSessionList(props) {
  const sessionItems = []
  Object.values(props.collection).forEach((item) => {
    sessionItems.push(<MarkSessionItem key={item.id} session={item} />)
  })
  return (
    <div>
      <h3>List</h3>
      {sessionItems}
    </div>
  )
}

export default MarkSessionList
