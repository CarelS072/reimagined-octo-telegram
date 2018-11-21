import React from 'react'
import { Link } from 'react-router-dom'


export class Navigation extends React.Component {
  render() {
    return (
      <div className='navigation, borders'>
        <h1>My Journal - {this.props.name} </h1>
        <h3>Navigation</h3>
        <button><Link to='/'>Home</Link></button>
        <button><Link to='/journal'>Journal</Link></button>
        <button><Link to='/import'>Import Data</Link></button>      
      </div>
    )
  }
}

export default Navigation
