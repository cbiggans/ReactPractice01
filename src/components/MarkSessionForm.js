import React from 'react'


const MarkSessionForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={(e) => {props.handleSubmit(e)}}>
      <input name='title'
             type='text'
             value={props.next.title}
             placeholder='Title'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='description'
             type='text'
             value={props.next.description}
             placeholder='Description'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='categories'
             type='text'
             value={props.next.categories}
             placeholder='Categories'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='type'
             type='text'
             value={props.next.type}
             placeholder='Type'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='tags'
             type='text'
             value={props.next.tags}
             placeholder='Tags'
             onChange={(e) => {props.handleChange(e)}} />
      <button type='submit'>Add MarkSession</button>
    </form>
  )
}

export default MarkSessionForm
