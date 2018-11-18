import React from 'react'
import FacebookLogin from 'react-facebook-login'
import ReactDOM from 'react-dom'

let fbContent=null

export default class FBLogon extends React.Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "Carel",
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
        <FacebookLogin
            appId="266966680001866"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
          <p>some render text here</p>
        </div>
      </React.Fragment>
    )
  }
}