import React from 'react'
import Home from './Home'
import FBLogon from './FBLogon'
import ReactDOM from 'react-dom'
import FacebookLogin from 'react-facebook-login'


export default class App extends 
React.Component {
  render() {
    return (
      <div>
        {/* <Home/> */}
        <FBLogon />
      </div>
   
    )
  }
}



