import React from 'react'


const MarkWidgetForm = (props) => {
  let buttons
  if(props.markWidget.id) {
    buttons = (
      <div>
        <button onClick={() => {props.destroy(props.markWidget.id)}}>DESTROY</button>
        <button onClick={() => {props.cancel(props.markWidget.id)}}>CANCEL</button>
      </div>
    )
  } else {
    buttons = (
      <div>
        <button onClick={() => {console.log('cancel')}}>CANCEL</button>
      </div>
    )
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
        <button type='submit'>Add MarkWidget</button>
      </form>
      { buttons }
    </div>
  )
}

export default MarkWidgetForm
