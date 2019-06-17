import React from 'react'


function MarkForm(props) {
  let extraButtons
  let submitButton

  if(props.mark.id) {
    submitButton = <button type='submit'>UPDATE</button>
    extraButtons = (
      <div>
        <button onClick={() => {props.destroyHandler(props.mark.id)}}>DESTROY</button>
        <button onClick={() => {props.closeForm(props.mark.id)}}>CLOSE</button>
      </div>
    )
  } else {
    submitButton =<button type='submit'>ADD</button>
  }
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e, props.mark.id)}>
        <input type='text'
               name='url'
               value={props.mark.url}
               placeholder='URL'
               onChange={props.handleChange} />
        <input type='text'
               name='title'
               value={props.mark.title}
               placeholder='Title'
               onChange={props.handleChange} />
        <input type='text'
               name='description'
               value={props.mark.description}
               placeholder='Description'
               onChange={props.handleChange} />
        <input type='text'
               name='tags'
               value={props.mark.tags}
               placeholder='Tags'
               onChange={props.handleChange} />
        <input type='text'
               name='category'
               value={props.mark.category}
               placeholder='Category'
               onChange={props.handleChange} />
        <input type='text'
               name='type'
               value={props.mark.type}
               placeholder='Type'
               onChange={props.handleChange} />
        {submitButton}
      </form>
      {extraButtons}
    </div>
  )
}

export default MarkForm
