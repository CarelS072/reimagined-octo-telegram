// STATUS
// Not functioning yet, IF function not performing IF statement? currently hardcoded to return false
// DONE - Need Privacy policy to activate local domain: https://termsfeed.com/blog/privacy-policy-url-facebook-app/
// DONE - Link to app page: https://developers.facebook.com/apps/266966680001866/settings/basic/
// https://www.youtube.com/watch?v=ea9KyE78qKI
// https://github.com/keppelen/react-facebook-login
// https://gist.github.com/bradtraversy/815369774ece6ede28a564e2a1e7153a
// https://medium.com/front-end-hacking/facebook-authorization-in-a-react-app-b7a9176aacb6

import React from 'react'
import FacebookLogin from 'react-facebook-login'
import ReactDOM from 'react-dom'

let fbContent=null

export default class FBLogon extends React.Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  }

  componentDidMount(){
    console.log('componenthas been mounted')
    this.checkStatus()

  }
  responseFacebook = response => {
    console.log(response)
  }
  componentClicked = () => console.log("clicked")

  checkStatus () {
      console.log('checkstatus has been called')

    if (this.state.isLoggedIn) {
      console.log('TRUE')
       fbContent = (
        <div styleName={{
          width: "400px",
          margin: "auto",
          background: "#f4f4f4",
          padding: "20px"
        }}>
        <img src={this.state.picture} alt={this.state.name} />
        <h2>Welcome {this.state.name}</h2>
      </div>
      )
    } else {
      console.log('False')
      fbContent = (
        <div>
          <p>some text here</p>
          <FacebookLogin
            appId="266966680001866"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>    

      )
    } 
  }

  render() {


    return (
      <React.Fragment>
        <div>
        {fbContent}
                <img src={this.state.picture} alt={this.state.name} />

          <p>some render text here</p>
        </div>
      </React.Fragment>
    )
  }
}


