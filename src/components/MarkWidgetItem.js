import React from 'react'
import { Link } from 'react-router-dom'


function MarkWidgetItem(props) {
  return (
    <div>
      <Link to={'/widget/' + props.widget.id}>
        {props.widget.title}
      </Link>
    </div>
  )
}

export default MarkWidgetItem
