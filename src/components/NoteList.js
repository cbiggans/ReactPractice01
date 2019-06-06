import React from 'react'


function NoteList(props) {
  const notesMapping = props.notes.mapping
  let notes = []

  if(props.currentMark.id in props.notes.mapping) {
    notes = notesMapping[props.currentMark.id]
  }

  notes = notes.map((note) => {
    return (
      <div key={note.key}>{note.timestamp}: {note.text}</div>
    )
  })
  return (
    <div>
      <div>LIST OF NOTES</div>
      <div>
        {notes}
      </div>
    </div>
  )
}

export default NoteList
