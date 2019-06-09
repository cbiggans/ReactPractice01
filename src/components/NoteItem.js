import React from 'react'


// TODO XXX: Put this into a library function or something
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


function NoteItem(props) {
  return (
    <div key={props.note.key}>
      <button onClick={() => {props.handleTimestampClicked(props.note.timestamp)}}>
        {cleanTime(props.note.timestamp)}
      </button>: {props.note.text}
      <button onClick={() => {props.handleDestroyNote(props.note.id, props.currentMark.id)}}>Destroy</button>
      <button onClick={() => {props.editNote(props.note)}}>EDIT</button>
    </div>
  )
}

export default NoteItem
