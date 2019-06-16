import React from 'react'
import { Link } from 'react-router-dom'


function MarkItem(props) {
  return (
    <div>
      <button>EDIT</button>
      <Link to={'/take-notes/' + props.mark.id}>
        {props.mark.title}
      </Link>
    </div>
  )
}

export default MarkItem
