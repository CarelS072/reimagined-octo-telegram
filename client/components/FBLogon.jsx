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
import request from 'superagent'

export default class FBLogon extends React.Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    at: "",
    facebook: {
      posts: {
        entries: [{
                  created_time: "2018-11-19T07:19:44+0000",
                  message: "if you can read this, FB has not been called yet",
                  id: "2064999846869913_2081024731934091"
                }]
      }
    }
  }


  componentDidMount(){
    console.debug('componenthas been mounted')
    // this.checkStatus()
  }

  responseFacebook = response => {
    console.debug('Accesstoken = '+response.accessToken)
    this.setState({
      isLoggedIn: true,
      userID: response.id,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      at: response.accessToken,
      facebook: {
        posts: {
          entries: [{
                    created_time: "2018-11-19T07:19:44+0000",
                    message: "if you can read this, FB has not been called yet",
                    id: "2064999846869913_2081024731934091"
                  },
                  {
                    created_time: "2018-11-19T07:19:44+0000",
                    message: "this is the second post that shows when fb has not been called yet.",
                    id: "2064999846869913_2081024731934091"
                  }],
        },
    }})
  }

  // componentClicked = () => console.log("clicked")

  callFB() {
      //params  
    let limit = 50 //default is 25
    let callURL = `https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%2Elimit%28${limit}%29%7Bcreated_time%2Cmessage%2Cfull_picture%7D&access_token=${this.state.at}`
      console.log('calling url '+ callURL)
    request
      .get(callURL)
      .then(res => {
        // let posts = res.posts.data
        console.log(res)
        this.setState({
          facebook: {
            posts: {
              entries: res.body.posts.data
              },
            }
          })
      })
      .catch(err => console.error(err))
    }
  
  // checkStatus () {
  //   let fbContent

  //   console.log('checkstatus has been called')
  //   if (this.state.isLoggedIn === false) {
  //     console.debug('logged on FALSE')
  //     fbContent = 
  //       <div>
  //         <FacebookLogin
  //           appId="266966680001866"
  //           autoLoad={true}
  //           fields="name,email,picture,posts"
  //           onClick={this.componentClicked}
  //           callback={this.responseFacebook}
  //         />
  //       </div>    
      
  //     console.log('False Statement + '+ fbContent)

  //   } else {
  //     console.debug('logged on TRUE')
  //     fbContent = (
  //       <div styleName={{
  //         width: "400px",
  //         margin: "auto",
  //         background: "#f4f4f4",
  //         padding: "20px"
  //       }}>
  //       <img src={this.state.picture} alt={this.state.name} /><h2>Welcome {this.state.name}</h2>
  //     </div>
  //     )
      
      
  //     console.debug('True statement + '+ fbContent)


  //   } 
  // }
  render() {
    return (
      <React.Fragment>

        <div className='facebook-logon'>        
          { this.state.isLoggedIn ? 
          <div>
                <h3> <strong>Welcome {this.state.name}</strong></h3> <img src={this.state.picture} alt={this.state.name} /> 
          </div> : 
          <FacebookLogin
            appId="266966680001866"
            autoLoad={true}
            fields="name,email,picture,posts"
            // onClick={this.componentClicked}
            callback={this.responseFacebook}
          />}
        </div>  
        
        <div>
          <button onClick={() => this.callFB()}>Call FB</button>
          {/* <p><strong>{this.state.facebook.posts.entries[0].message}</strong></p> */}
          <p>{this.state.facebook.posts.entries.map((entry, id) => {
              return <div><li key={id}>{entry.message} - {entry.created_time}</li>{ entry.full_picture ? <img src={entry.full_picture} alt ={entry.message} />: null} 
              </div>})}</p>
        </div>
      </React.Fragment>
    )
  }
}

//limit results to 40
// curl -i -X GET "https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%2Elimit%2840%29%7Bcreated_time%2Cmessage%2Cfull_picture%7D&access_token=EAADyzgYg3UoBAD5NLZB7rLTPOYYfgNNNdf4ZAeCIKq5Y9CLVAdIb0k4d3ZAMJAUWiejFP5sai2BWYCEglDtBumM2JSGPjL9hr0hZA0wyPAL7Et9AZCDmBxh5qsAWLuB7zWu4gi5bJuxGjGedZAA70GONpWFZBOpTG9tiThBvpGUNCXr7o8HOU69fYo9wKOXYlcv9ZBd3BrZCkUQZDZD"

// curl -i -X GET \
// without posts without pictures
//  "https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%7D&access_token=EAADyzgYg3UoBAO1eNn3TGIMoGRJH8dxqgW4ZAtAGc9ZCkQ9jo1jOQT46bZBrhodmbEbuimVlJu358V7i2nut28uZCIFDd1n6vq0HaAnqs9zcqOfUo1h6iiL7sS5ybeubRt9ySEETtxnPSwYlZBWLiOiZBixQFGlqkJw8OLGGDZCTvZC2gAUrxQnWnw7Bnu1JOXvQpKwZBNLjiXX3SPQAE8QxZCATqOHRt6YfbwiZAcJzZALhwAZDZD"


// posts with pictures
// curl -i -X GET \
//  "https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%2Cfull_picture%7D&access_token=EAADyzgYg3UoBAHgAmPClaXSoK21aKq2Xl7ZB01u79oR6leStLhxniXWwCcTtMYxDa1u1rSHTtQaeLZAqYpPTELAeEXqoI05qFsw23yLZBZCy45ZCaY5OkGoyiuRMW3BlhsWyKD9uBsTr9Lg8LAN8sWanaKkGRTGRz6pKS3FqlibHsa0u5gf8eDR6rkWgZAufkdL6D09fU4cQwcZCo4WgZAJ8ErwRJgvWb9hBhEZAZBBmaXNgZDZD"

//EXAMPLE response without pictures:
// {
//   "id": "2064999846869913",
//   "name": "Carel Starreveld",
//   "posts": {
//     "data": [
//       {
//         "created_time": "2018-11-19T07:19:44+0000",
//         "message": "Just found this gem #UK_Garage_tunes",
//         "id": "2064999846869913_2081024731934091"
//       },
/////////////////////
//       {
//         "created_time": "2018-06-01T18:32:15+0000",
//         "message": "Back to Auckland! Thanks everyone for the wonderful time missing you heaps!",
//         "id": "2064999846869913_1833745493328684"
//       }
//     ],
//     "paging": {
//       "previous": "https://graph.facebook.com/v3.2/2064999846869913/posts?format=json&fields=created_time,message&since=1542611984&access_token=EAADyzgYg3UoBAO1eNn3TGIMoGRJH8dxqgW4ZAtAGc9ZCkQ9jo1jOQT46bZBrhodmbEbuimVlJu358V7i2nut28uZCIFDd1n6vq0HaAnqs9zcqOfUo1h6iiL7sS5ybeubRt9ySEETtxnPSwYlZBWLiOiZBixQFGlqkJw8OLGGDZCTvZC2gAUrxQnWnw7Bnu1JOXvQpKwZBNLjiXX3SPQAE8QxZCATqOHRt6YfbwiZAcJzZALhwAZDZD&limit=25&__paging_token=enc_AdAEZAdGmN6rjR7xh3DoaRAidZARBGPpQEKa2mk6vvR9038kRK37QxEUJ3G3CgYAJiv2pfBW4HdK8lzWr79yIiUwkZAJvJq5g7osGXGMyghnu4QtAZDZD&__previous=1",
//       "next": "https://graph.facebook.com/v3.2/2064999846869913/posts?format=json&fields=created_time,message&access_token=EAADyzgYg3UoBAO1eNn3TGIMoGRJH8dxqgW4ZAtAGc9ZCkQ9jo1jOQT46bZBrhodmbEbuimVlJu358V7i2nut28uZCIFDd1n6vq0HaAnqs9zcqOfUo1h6iiL7sS5ybeubRt9ySEETtxnPSwYlZBWLiOiZBixQFGlqkJw8OLGGDZCTvZC2gAUrxQnWnw7Bnu1JOXvQpKwZBNLjiXX3SPQAE8QxZCATqOHRt6YfbwiZAcJzZALhwAZDZD&limit=25&until=1527877935&__paging_token=enc_AdBMq3TeKi6u4fycZCKwUTn3ZCn9EmTW83OZByzIj3HzvkKazHJ0NAL2eso5NsIZBMGaExAF5r2ytYeMgtNQ5DEoHS2SzK3K4w4sziC6n6P4HoDSUwZDZD"
//     }
//   }
// }
// Response received in 895 ms
// Copy Debug InformationGet CodeSave Session
