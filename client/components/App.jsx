  //MiddleWare
import React from 'react'
import ReactDOM from 'react-dom'
import FacebookLogin from 'react-facebook-login'
import { HashRouter as Router, Route } from 'react-router-dom'


  //Components
import FBLogon from './FBLogon'
import Home from './Home'
import Navigation from './Navigation'
import Journal from './Journal'
import ImportData from './ImportData'
import AddJournal from './AddJournal'


export default class App extends 
React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route exact path='/journal' component={Journal} />
          <Route exact path='/import' component={ImportData} />
          <Route exact path='/journal/add' component={AddJournal} />
        </React.Fragment>
      </Router> 
    )
  }
}



