import React from 'react'


function MarkList(props) {
  const marks = props.marks.map((item) => {
    return (
      <div key={item.id}>
        <a href={item.url} target='_blank' rel="noopener noreferrer">
          {item.title}
        </a>
        <button onClick={() => {props.destroyHandler(item.id)}}>Destroy</button>
      </div>
    )
  })

  return (
    <div>
      <div>MarkList</div>
      {marks}
    </div>
  )
}

export default MarkList
