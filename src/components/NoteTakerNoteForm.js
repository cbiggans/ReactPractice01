import React from 'react'


function NoteTakerNoteForm(props) {
  return(
    <div>
      <h3>Test NOTE</h3>
      <form onSubmit={props.handleSubmit}>
        <input type='text'
               name='newNoteText'
               autoFocus
               value={props.newNote.text}
               onChange={props.handleChange} />
        <button type='submit'>ADD NOTE</button>
      </form>
    </div>
  )
}

export default NoteTakerNoteForm
