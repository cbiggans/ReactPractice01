import React from 'react'
import { Link } from 'react-router-dom'
import MarkItem from './MarkItem'


function MarkWidgetWindow(props) {
  let marks

  if(props.markIdOrder) {
    marks = props.markIdOrder.map((id) => {
      return (
        <MarkItem key={id} mark={props.markCollection[id]} />
      )
    })
  } else {
    marks = []
  }

  return (
    <div>
      <h2>
        {props.widget.title}
      </h2>
      {marks}
    </div>
  )
}

export default MarkWidgetWindow
