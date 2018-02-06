import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
	constructor(props){
		super(props);
	this._handleLogout = this._handleLogout.bind(this);
	}

	_handleLogout(){
		this.props.logout();
		this.props.history.push('/');
	}

	render() {
		return(
				<div className="container">
				<center><h2>You Are Logged in!</h2></center>
				<br/>
				<center><button type="button" onClick={this._handleLogout}>Logout</button></center>
				</div>
			);
	}
} 
export default Home;