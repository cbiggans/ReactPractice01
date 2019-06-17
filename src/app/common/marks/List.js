import React from 'react'
import { Link } from 'react-router-dom'
import MarkForm from './Form'


function MarkList(props) {
  const marks = props.marks.map((item) => {
    if(item.id in props.displaySettings.editing && 
       props.displaySettings.editing[item.id]) {
      return <MarkForm key={item.id}
                       mark={item}
                       closeForm={props.closeForm}
                       destroyHandler={props.destroyHandler}
                       handleChange={(e) => props.handleChange(e, item.id)}
                       handleSubmit={(e) => props.handleSubmit(e, item.id)} />
    } else {
      return (
        <div key={item.id}>
          <button onClick={() => {props.editMark(item.id)}}>Edit</button>
          <Link to={'/take-notes/' + item.id}>
            {item.title}
          </Link>
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
