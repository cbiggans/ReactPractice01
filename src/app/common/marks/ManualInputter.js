import React from 'react'


function ManyMarkInputter(props) {
  return (
    <textarea type='text'
              name='markInputter'
              rows='10'
              cols='50'
              autoFocus
              value={props.markInputter}
              onChange={props.handleChange} />
  )
}

export default ManyMarkInputter
