import React from 'react'


function MarkForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input type='text'
             name='url'
             value={props.nextMark.url}
             placeholder='URL'
             onChange={props.handleChange} />
      <button type='submit'>ADD</button>
    </form>
  )
}

export default MarkForm
