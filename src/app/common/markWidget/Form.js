import React from 'react'
import ManyMarkInputter from '../marks/ManualInputter'


const MarkWidgetForm = (props) => {
  let extraButtons
  if(props.markWidget.id) {
    extraButtons = (
      <div>
        <button onClick={() => {props.destroy(props.markWidget.id)}}>DESTROY</button>
        <button onClick={() => {props.cancel(props.markWidget.id)}}>CANCEL</button>
      </div>
    )
  } else {
    extraButtons = (
      <div>
        <button onClick={() => {console.log('cancel')}}>CANCEL</button>
      </div>
    )
  }

  var manualInputter
  console.log('IN MARK_WIDGET_FORM RENDER')
  if(props.displayOptions.manualInputterOpen) {
    manualInputter = <ManyMarkInputter markInputter={props.markWidget.markInputter}
                                       handleChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
  } else {
    manualInputter = null
  }

  return (
    <div>
      <form onSubmit={(e) => {props.handleSubmit(e, props.markWidget.id)}}>
        <input name='title'
               type='text'
               value={props.markWidget.title}
               placeholder='Title'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='searchTerm'
               type='text'
               value={props.markWidget.searchTerm}
               placeholder='Search Term'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='order'
               type='text'
               value={props.markWidget.order}
               placeholder='order'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='orderBy'
               type='text'
               value={props.markWidget.orderBy}
               placeholder='Order By'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='maxTotal'
               type='text'
               value={props.markWidget.maxTotal}
               placeholder='Max Total'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        { manualInputter }
        <button type='button' onClick={() => props.openManualInputter(props.markWidget.id)}>Add Marks Manually</button>
        <button type='submit'>Add MarkWidget</button>
      </form>
      { extraButtons }
    </div>
  )
}

export default MarkWidgetForm
