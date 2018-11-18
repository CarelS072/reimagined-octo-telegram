import React from 'react'
import request from 'superagent'
import token from './donotsync.js'

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

  //this is where the grabposts function was

// }
console.log('token = '+ token)

export default class Home extends React.Component {
  state = {
    url: 'https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Cposts%7Bcreated_time%2Clink%2Cdescription%2Cfull_picture%7D&access_token=',
    AT: 'EAADyzgYg3UoBAG6amFZCxZAHnJaeZB2sqQck6hIZCnHTiRZA5pM2eiOFkdIVzZCYPyIxPlgggUUeA2TX7IZCKqrUVCxJGGiK9Be3WbTkDVnhlPlI5bTw2t6ukdbHm5nD5IBYqP7MU8l9DpV44KI4JBFsda4JxUPX8ZAbyBHZBoiHXnTjMlfEcKZBxXza7BiRTZABtXZCeR1p9KIkowZDZD',
    posts:'',
  }
  grabPosts() {
    console.log(`${this.state.url}${this.state.AT}`)
    request
      .get(`${this.state.url}${this.state.AT}`)
      .then(res => {
        this.setState({
          name: res.body.name,
          datePost: res.body.posts.data[1].created_time,
          descriptionPost: res.body.posts.data[1].description,
          linkPost: res.body.posts.data[1].link,
          image: res.body.posts.data[1].full_picture
        })
      })
    }
  componentDidMount(){
    this.grabPosts()
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello World</h1>
        <p>Hi {this.state.name}</p>
        <h3>{this.state.datePost}</h3>
        <p>{this.state.descriptionPost}</p>
        <img src={this.state.image} alt='FB image of post'/>
        <a href={this.state.linkPost}>Click to view this post on FB</a>

        
  
      </React.Fragment>
    )
  }
  
  }


