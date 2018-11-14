import React from 'react'

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

  //this is where the grabposts function was

// }
function grabPosts() {
  FB.api('/me?fields=id,name,photos{comments,link,created_time}', (response) => {
    console.log('Successful login for: ' + response.name)
    return response
  })
}
const Home = () => {
  return (
    <React.Fragment>
      <h1>Hello World</h1>
      <p>Hi Mom</p>
      <p>{grabPosts()}</p>

    </React.Fragment>
  )
}

export default Home
