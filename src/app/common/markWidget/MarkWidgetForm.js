import React from 'react'


const MarkWidgetForm = (props) => {
  return (
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
  )
}

export default MarkWidgetForm
