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
    console.log('componenthas been mounted')
    this.checkStatus()
  }

  responseFacebook = response => {
    console.log('Accesstoken = '+response.accessToken)
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

  componentClicked = () => console.log("clicked")

  callFB() {
    console.log('calling url '+ `https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%7D&access_token=${this.state.at}`)
    request
      .get(`https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%2Cfull_picture%7D&access_token=${this.state.at}`)
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
      .catch(err => console.log(err))
    }
  
  checkStatus () {
    let fbContent

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
        <img src={this.state.picture} alt={this.state.name} /><h2>Welcome {this.state.name}</h2>
      </div>
      )
      console.log('True statement + '+ fbContent)
    } else {
      console.log('FALSE')
      fbContent = (
        <div>
          <p>some text here</p>
          <FacebookLogin
            appId="266966680001866"
            autoLoad={true}
            fields="name,email,picture,posts"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>    
      )
      console.log('False Statement + '+ fbContent)

    } 
  }
  render() {
    return (
      <React.Fragment>
        <div>
        {/* {fbContent} */}
        
        <div>
          <img src={this.state.picture} alt={this.state.name} /> <p>Welcome <strong>{this.state.name}</strong></p>
        </div>

        <FacebookLogin
            appId="266966680001866"
            autoLoad={true}
            fields="name,email,picture,posts"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />

          <button onClick={() => this.callFB()}>Call FB</button>
          <p><strong>{this.state.facebook.posts.entries[0].message}</strong></p>
          <p>{this.state.facebook.posts.entries.map((entry, id) => {
              return <div><li key={id}>{entry.message} - {entry.created_time}</li>{entry.full_picture ? <img src={entry.full_picture} alt ={entry.message} />: null} 
              </div>})}</p>

          

        </div>
      </React.Fragment>
    )
  }
}


// curl -i -X GET \
// without posts without pictures
//  "https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%7D&access_token=EAADyzgYg3UoBAO1eNn3TGIMoGRJH8dxqgW4ZAtAGc9ZCkQ9jo1jOQT46bZBrhodmbEbuimVlJu358V7i2nut28uZCIFDd1n6vq0HaAnqs9zcqOfUo1h6iiL7sS5ybeubRt9ySEETtxnPSwYlZBWLiOiZBixQFGlqkJw8OLGGDZCTvZC2gAUrxQnWnw7Bnu1JOXvQpKwZBNLjiXX3SPQAE8QxZCATqOHRt6YfbwiZAcJzZALhwAZDZD"


// posts with pictures
// curl -i -X GET \
//  "https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Cmessage%2Cfull_picture%7D&access_token=EAADyzgYg3UoBAHgAmPClaXSoK21aKq2Xl7ZB01u79oR6leStLhxniXWwCcTtMYxDa1u1rSHTtQaeLZAqYpPTELAeEXqoI05qFsw23yLZBZCy45ZCaY5OkGoyiuRMW3BlhsWyKD9uBsTr9Lg8LAN8sWanaKkGRTGRz6pKS3FqlibHsa0u5gf8eDR6rkWgZAufkdL6D09fU4cQwcZCo4WgZAJ8ErwRJgvWb9hBhEZAZBBmaXNgZDZD"

//EXAMPLE response:
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
//       {
//         "created_time": "2018-11-09T09:37:13+0000",
//         "message": "Watched Bohemian Rhapsody ! Amazing!",
//         "id": "2064999846869913_2066944930008738"
//       },
//       {
//         "created_time": "2018-10-29T04:53:06+0000",
//         "id": "2064999846869913_2049475658422332"
//       },
//       {
//         "created_time": "2018-10-23T05:43:30+0000",
//         "message": "I've got the skateboard,  now the chair",
//         "id": "2064999846869913_2041231665913398"
//       },
//       {
//         "created_time": "2018-10-14T18:29:01+0000",
//         "message": "Back to school, bootcamp starts !",
//         "id": "2064999846869913_2029812167055348"
//       },
//       {
//         "created_time": "2018-09-21T02:10:10+0000",
//         "message": "damn, this is 7 years ago already :O",
//         "id": "2064999846869913_1999255226777709"
//       },
//       {
//         "created_time": "2018-09-17T05:29:41+0000",
//         "message": "Kyrgyzstan was amazing !",
//         "id": "2064999846869913_1994673130569252"
//       },
//       {
//         "created_time": "2018-09-12T11:11:30+0000",
//         "id": "2064999846869913_1988777571158808"
//       },
//       {
//         "created_time": "2018-09-11T15:22:23+0000",
//         "id": "2064999846869913_1987767341259831"
//       },
//       {
//         "created_time": "2018-09-05T14:15:06+0000",
//         "message": "Even the US and the French joined for a game of Kok Boru ! https://www.smithsonianmag.com/people-places/kok-boru-the-horse-game-you-wont-see-at-the-olympics-18386029/",
//         "id": "2064999846869913_1980319642004601"
//       },
//       {
//         "created_time": "2018-09-05T04:59:21+0000",
//         "id": "2064999846869913_1979851395384759"
//       },
//       {
//         "created_time": "2018-09-05T04:03:01+0000",
//         "message": "Some more pictures of the games eagle hunting and archery",
//         "id": "2064999846869913_1979805635389335"
//       },
//       {
//         "created_time": "2018-09-04T06:19:05+0000",
//         "message": "Falcons catching things at World Nomad Games",
//         "id": "2064999846869913_1978608872175678"
//       },
//       {
//         "created_time": "2018-09-02T13:37:54+0000",
//         "id": "2064999846869913_1976598822376683"
//       },
//       {
//         "created_time": "2018-09-02T13:37:11+0000",
//         "message": "At the World Nomad Games 2018 !",
//         "id": "2064999846869913_1976598162376749"
//       },
//       {
//         "created_time": "2018-09-02T02:01:00+0000",
//         "id": "2064999846869913_1976050792431486"
//       },
//       {
//         "created_time": "2018-08-31T07:05:45+0000",
//         "id": "2064999846869913_1973839149319317"
//       },
//       {
//         "created_time": "2018-08-24T08:46:15+0000",
//         "message": "We are going on an adventure #carry_on_only",
//         "id": "2064999846869913_1964960396873859"
//       },
//       {
//         "created_time": "2018-08-21T20:49:26+0000",
//         "id": "2064999846869913_1960725250630707"
//       },
//       {
//         "created_time": "2018-08-18T02:20:04+0000",
//         "id": "2064999846869913_1954205937949305"
//       },
//       {
//         "created_time": "2018-08-03T08:30:56+0000",
//         "message": "I wonder what this cat is doing now",
//         "id": "2064999846869913_1927884357248130"
//       },
//       {
//         "created_time": "2018-07-24T19:14:56+0000",
//         "id": "2064999846869913_1911927828843783"
//       },
//       {
//         "created_time": "2018-07-14T11:17:49+0000",
//         "message": "Lolololololol",
//         "id": "2064999846869913_1895292190507347"
//       },
//       {
//         "created_time": "2018-06-23T02:30:11+0000",
//         "message": "Love it",
//         "id": "2064999846869913_1861683163868250"
//       },
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
