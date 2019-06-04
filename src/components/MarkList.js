import React from 'react'
import { Link } from 'react-router-dom'


function MarkList(props) {
  const marks = props.marks.map((item) => {
    return (
      <div key={item.id}>
        <Link to={'/take-notes/' + item.id}>
          {item.title}
        </Link>
        <button onClick={() => {props.destroyHandler(item.id)}}>Destroy</button>
      </div>
    )
  })

  return (
    <div>
      <div>MarkList</div>
      {marks}
    </div>
  )
}

export default MarkList
