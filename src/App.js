import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';
import Wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/carteira">
          <Wallet />
        </Route>
      </Switch>
    );
  }
}
