import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    );
  }
}
