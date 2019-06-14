import React from 'react'
import { Link } from 'react-router-dom'


function MarkSessionItem(props) {
  return (
    <div>
      <Link to={'/session/' + props.session.id}>
        {props.session.title}
      </Link>
    </div>
  )
}

export default MarkSessionItem
