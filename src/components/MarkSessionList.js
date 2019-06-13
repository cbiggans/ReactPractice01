import React from 'react'


function MarkSessionList(props) {
  const sessionItems = props.list.map((item) => {
    return <div key={item.id}>{item.title}</div>
  })
  return (
    <div>
      <h3>List</h3>
      {sessionItems}
    </div>
  )
}

export default MarkSessionList
