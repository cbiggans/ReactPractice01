import React from 'react'


// TODO XXX
// Should be titled something like NoteEditorForm because want to reuse this
//  for editing all Notes
function NoteTakerNoteForm(props) {
  return(
    <div>
      <h3>Test NOTE</h3>
      <form onSubmit={props.handleSubmit} id="newNoteForm">
        <input type='text'
               name='timestamp'
               readOnly // Put this here for now to prevent warnings, change later
               value={props.newNote.timestamp} />
        <textarea type='text'
                  name='text'
                  autoFocus
                  value={props.newNote.text}
                  onChange={props.handleChange} />
        <button type='submit'>ADD NOTE</button>
      </form>
    </div>
  )
}

export default NoteTakerNoteForm
