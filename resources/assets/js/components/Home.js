import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { parseJSON, httpUrl } from './../authentication/auth.js';

class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			err : '',
			error: {}
		}

	this._handleLogout = this._handleLogout.bind(this);
	this._handleRegister = this._handleRegister.bind(this);
	}

	_handleRegister(){

		var email = this.refs.email.value;
		var pass = this.refs.pass.value;
		var name = this.refs.name.value;

		if(email.length > 0 && pass.length > 0 && name.length > 0){
			this.ajaxCall();
		}else{
			this.setState({err:'Invalid email or password'});
		}
	}

	_handleLogout(){
		this.props.logout();
		this.props.history.push('/');
	}

	ajaxCall(){

		const token = $("#csrf_token").attr('content');

		const data = { 
						email : this.refs.email.value,
						pass : this.refs.pass.value,
						name : this.refs.name.value,
		 		     }

		const options = {
                method: 'POST',
                //mode: "cors",
                credentials: "same-origin",
                headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'X-CSRF-TOKEN': token
          },
          body:JSON.stringify(data)
        }
     
		fetch(httpUrl+'/register', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					this.props.history.push('/home');

			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})
	}

	render() {
		return(
				<div className="container">
				<center><h2>Add</h2></center>
				<button type="button" onClick={()=>{this.props.history.push('/')}}>View</button>
				<button type="button" onClick={this._handleLogout}>Logout</button>
				<br/>

				<div className="container row col-md-12">
					<div className="col-md-3">
					</div>
					<div className="col-md-6">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
							<div className="col-md-4">
							</div>
							<div className="col-md-8">
							{this.state.err}
							</div>
								<div className="col-md-4">
								<center>Name :</center>
								</div>
								<div className="col-md-8">
								<input type="text" onKeyDown={(event) => {if(event.which == 13){this._handleRegister()}}} ref="name" name="name"/>
								</div>
								<div className="col-md-4">
								<center>Email :</center>
								</div>
								<div className="col-md-8">
								<input type="text" onKeyDown={(event) => {if(event.which == 13){this._handleRegister()}}} ref="email" name="email"/>
								</div>
								<div className="col-md-4">
								<center>Password :</center>
								</div>
								<div className="col-md-8">
								<input type="password" onKeyDown={(event) => {if(event.which == 13){this._handleRegister()}}} ref="pass" name="pass"/>
								</div>
								<div className="col-md-4">
								&nbsp;
								</div>
								<div className="col-md-8">
								<button className="btn btn-primary" onClick={this._handleRegister} type="button">Register</button>
								</div>
							</div>
						</div>
					</div>
					</div>
					<div className="col-md-3">
					</div>
				</div>

				
				</div>
			);
	}
} 
export default Home;