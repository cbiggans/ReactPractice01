import React from 'react'
import { Link } from 'react-router-dom'


function MarkWidgetItem(props) {
  let marks

  if(props.markIdOrder) {
    marks = props.markIdOrder.map((id) => {
      return <div>{props.markCollection[id].url}</div>
    })
  } else {
    marks = []
  }
  return (
    <div>
      <Link to={'/widget/' + props.widget.id}>
        {props.widget.title}
      </Link>
      {marks}

    </div>
  )
}

export default MarkWidgetItem
