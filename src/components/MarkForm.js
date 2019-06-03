import React from 'react'


function MarkForm(props) {
  return (
    <form onSubmit={(e) => {console.log('form submitted')}}>
      <input type='text'
             name='url'
             value={props.nextMark.url}
             placeholder='URL'
             onChange={(e) => {console.log('Changed url')}} />
      <button type='submit'>ADD</button>
    </form>
  )
}

export default MarkForm
