import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <header className='App-header'>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/summary'>Summary</Link>
      </nav>
    </header>
  )
}

export default Nav
