import React from 'react'
import { Link } from 'react-router-dom'
import MarkForm from './MarkForm'


function MarkList(props) {
  const marks = props.marks.map((item) => {
    if(props.displaySettings.editing.has(item.id)) {
      return <MarkForm key={item.id}
                       mark={item}
                       destroyHandler={props.destroyHandler}
                       handleChange={(e) => props.handleChange(e, item.id)}
                       handleSubmit={(e) => props.handleSubmit(e, item.id)} />
    } else {
      return (
        <div key={item.id}>
          <Link to={'/take-notes/' + item.id}>
            {item.title}
          </Link>
          <button onClick={() => {props.destroyHandler(item.id)}}>Destroy</button>
          <button onClick={() => {props.editMark(item.id)}}>Edit</button>
        </div>
      )
    }
  })

  return (
    <div>
      <div>MarkList</div>
      {marks}
    </div>
  )
}

export default MarkList
