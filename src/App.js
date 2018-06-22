import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Main} from './components/main/main';
import {Login} from './components/login/login';
import {Register} from './components/register/register';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Register {...props}/>}/>
          <Route path="/login" render={props => <Login {...props}/>}/>
          <Route path="/register" render={props => <Register {...props}/>}/>
          <Route path="/main" render={props => <Main {...props}/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
