import React from 'react'
import { Link } from 'react-router-dom'
import FBLogon from './FBLogon'


export class ImportData extends React.Component {
  render() {
    return (
      <div>
        <h1>Import Data</h1>
        <FBLogon />
      </div>
    )
  }
}

export default ImportData
