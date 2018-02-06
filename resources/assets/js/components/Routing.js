import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { checkAlreadyLogin, login, logout } from './../authentication/auth.js';

import Login from './Login.js';
import Home from './Home.js';

export const Routing = (props) => {

		return (
			<Router>
				<Switch>
					<Route exact path="/" render={(props)=>checkAlreadyLogin(<Home {...props} logout={logout}/>, <Login {...props} login={login}/>)} />
					<Route path="/home" render={(props)=>checkAlreadyLogin(<Home {...props} logout={logout}/>, <Login {...props} login={login}/>)} />
				</Switch>
			</Router>
		);

}