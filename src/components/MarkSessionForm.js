import React from 'react'


const MarkSessionForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={(e) => {e.preventDefault(); console.log('submitted')}}>
      <input name='title'
             type='text'
             value={props.newSession.title}
             placeholder='Title'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='description'
             type='text'
             value={props.newSession.description}
             placeholder='Description'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='categories'
             type='text'
             value={props.newSession.categories}
             placeholder='Categories'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='type'
             type='text'
             value={props.newSession.type}
             placeholder='Type'
             onChange={(e) => {props.handleChange(e)}} />
      <input name='tags'
             type='text'
             value={props.newSession.tags}
             placeholder='Tags'
             onChange={(e) => {props.handleChange(e)}} />
      <button type='submit'>Add MarkSession</button>
    </form>
  )
}

export default MarkSessionForm
