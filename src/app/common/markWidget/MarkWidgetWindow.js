import React from 'react'
import MarkItem from '../marks/Item'
import '../../duck/styles/markWidgetWindow.css'


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
    <div className='widgetWindow'>
      <h2>
        {props.widget.title}
      </h2>
      {marks}
    </div>
  )
}

export default MarkWidgetWindow
