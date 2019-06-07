import React from 'react'

function cleanTime(timestamp) {
  // Verified this w/ this stackoverflow: https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
  var num = Math.round(timestamp)
  var hours = Math.floor(num/3600)
  var minutes = Math.floor((num%3600)/60)
  var seconds = num%60

  let result = ''
  if(hours > 0 ) {
    if(hours < 10) {hours = "0" + hours}
    result = hours + ':'
  }

  if(minutes < 10) {minutes = "0" + minutes}
  if(seconds < 10) {seconds = "0" + seconds}

  result = result + minutes + ':' + seconds
  return result
}

function NoteList(props) {
  const notesMapping = props.notes.mapping
  let notes = []

  if(props.currentMark.id in props.notes.mapping) {
    notes = notesMapping[props.currentMark.id]
  }

  notes = notes.map((note) => {
    return (
      <div key={note.key}>
        <button onClick={() => {props.handleTimestampClicked(note.timestamp)}}>
          {cleanTime(note.timestamp)}
        </button>: {note.text}
      </div>
    )
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
