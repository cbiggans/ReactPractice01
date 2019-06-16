import React from 'react'
import { Link } from 'react-router-dom'
import '../duck/styles/app.css'


function Header(props) {
  return (
    <div className='foo'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/marks">Marks</Link>
        </li>
      </ul>
    </div>
  )
}


export default Header
