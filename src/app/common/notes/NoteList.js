import React from 'react'
import NoteItem from './NoteItem'


function NoteList(props) {
  const notesMapping = props.notes.mapping
  let notes = []

  if(props.currentMark.id in props.notes.mapping) {
    notes = notesMapping[props.currentMark.id]
  }

  // TODO XXX: The elements need to be put in their own component NoteItem
  notes = notes.map((note) => {
    return <NoteItem key={note.key}
                     note={note}
                     currentMark={props.currentMark}
                     handleTimestampClicked={props.handleTimestampClicked}
                     editNote={props.editNote}
                     handleDestroyNote={props.handleDestroyNote} />
  })
  return (
    <div>
      <div>LIST OF NOTES</div>
      <div>
        <button onClick={() => {props.changeNoteOrder(props.currentMark.id, 'ascending')}}>
          Ascending
        </button>
        <button onClick={() => {props.changeNoteOrder(props.currentMark.id, 'descending')}}>
          Decending
        </button>
      </div>
      <div>
        {notes}
      </div>
    </div>
  )
}

export default NoteList
