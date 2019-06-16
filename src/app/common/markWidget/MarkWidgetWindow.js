import React from 'react'
import MarkItem from '../marks/Item'
import MarkWidgetForm from './MarkWidgetForm'
import MarkWidgetFormContainer from './MarkWidgetFormContainer'
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

  let header
  if(!props.displayOptions.openEditors[props.widget.id]) {
    header = (
      <h2>
        {props.widget.title}
        <button onClick={() => props.openEditor(props.widget.id)}>EDIT</button>
      </h2>
    )
  } else {
    header = <MarkWidgetFormContainer id={props.widget.id} />
  }

  return (
    <div className='widgetWindow'>
      {header}
      {marks}
    </div>
  )
}

export default MarkWidgetWindow
