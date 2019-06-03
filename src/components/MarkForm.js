import React from 'react'


function MarkForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input type='text'
             name='url'
             value={props.nextMark.url}
             placeholder='URL'
             onChange={props.handleChange} />
      <input type='text'
             name='title'
             value={props.nextMark.title}
             placeholder='Title'
             onChange={props.handleChange} />
      <input type='text'
             name='description'
             value={props.nextMark.description}
             placeholder='Description'
             onChange={props.handleChange} />
      <input type='text'
             name='tags'
             value={props.nextMark.tags}
             placeholder='Tags'
             onChange={props.handleChange} />
      <input type='text'
             name='category'
             value={props.nextMark.category}
             placeholder='Category'
             onChange={props.handleChange} />
      <input type='text'
             name='type'
             value={props.nextMark.type}
             placeholder='Type'
             onChange={props.handleChange} />
      <button type='submit'>ADD</button>
    </form>
  )
}

export default MarkForm
