import React from 'react'
import { Link } from 'react-router-dom'


export class Navigation extends React.Component {
  render() {
    return (
      <div className='navigation'>
        <h1>Navigation</h1>
        <button><Link to='/'>Home</Link></button>
        <button><Link to='/journal'>Journal</Link></button>
        <button><Link to='/import'>Import Data</Link></button>      
      </div>
    )
  }
}

export default Navigation
