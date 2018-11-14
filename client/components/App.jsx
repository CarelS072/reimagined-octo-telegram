import React from 'react'
import Home from './Home'


function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response)
  })
}


export default class App extends 
React.Component {
  // componentDidMount(){
  //   checkLoginState( status => console.log(status.userID))
  // // Response will look something like this
  // //   {
  // //     status: 'connected',
  // //     authResponse: {
  // //         accessToken: '...',
  // //         expiresIn:'...',
  // //         signedRequest:'...',
  // //         userID:'...'
  // //     }
  // // }
  // }
  render() {
    return (
      <Home/>
    )
  }
}


