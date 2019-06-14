import React from 'react'


const MarkSessionForm = (props) => {
  return (
    <form onSubmit={(e) => {props.handleSubmit(e, props.markSession.id)}}>
      <input name='title'
             type='text'
             value={props.markSession.title}
             placeholder='Title'
             onChange={(e) => {props.handleChange(e, props.markSession.id)}} />
      <input name='description'
             type='text'
             value={props.markSession.description}
             placeholder='Description'
             onChange={(e) => {props.handleChange(e, props.markSession.id)}} />
      <input name='categories'
             type='text'
             value={props.markSession.categories}
             placeholder='Categories'
             onChange={(e) => {props.handleChange(e, props.markSession.id)}} />
      <input name='type'
             type='text'
             value={props.markSession.type}
             placeholder='Type'
             onChange={(e) => {props.handleChange(e, props.markSession.id)}} />
      <input name='tags'
             type='text'
             value={props.markSession.tags}
             placeholder='Tags'
             onChange={(e) => {props.handleChange(e, props.markSession.id)}} />
      <button type='submit'>Add MarkSession</button>
    </form>
  )
}

export default MarkSessionForm
