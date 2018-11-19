import React from 'react'
import { Link } from 'react-router-dom'
import FBLogon from './FBLogon'


export class ImportData extends React.Component {
  render() {
    return (
      <div>
        <h3>Import Data</h3>
        <FBLogon />
      </div>
    )
  }
}

export default ImportData
