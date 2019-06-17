import React from 'react'


const MarkWidgetForm = (props) => {
  let buttons
  if(props.markWidget.id) {
    buttons = (
      <div>
        <button onClick={() => {props.destroy(props.markWidget.id)}}>DESTROY</button>
        <button onClick={() => {console.log('cancel')}}>CANCEL</button>
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
               value={props.markWidget.description}
               placeholder='Search Term'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='order'
               type='text'
               value={props.markWidget.categories}
               placeholder='order'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='orderBy'
               type='text'
               value={props.markWidget.type}
               placeholder='Order By'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <input name='maxTotal'
               type='text'
               value={props.markWidget.tags}
               placeholder='Max Total'
               onChange={(e) => {props.handleChange(e, props.markWidget.id)}} />
        <button type='submit'>Add MarkWidget</button>
      </form>
      { buttons }
    </div>
  )
}

export default MarkWidgetForm
