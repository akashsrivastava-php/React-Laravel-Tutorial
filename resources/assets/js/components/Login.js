import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { parseJSON } from './../authentication/auth.js';

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			err : '',
			error: {}
		}
		this._handleLogin = this._handleLogin.bind(this);
		this.ajaxCall = this.ajaxCall.bind(this);
	}

	_handleLogin(){
		var email = this.refs.email.value;
		var pass = this.refs.pass.value;

		if(email.length > 0 && pass.length > 0){
			this.ajaxCall();
		}else{
			this.setState({err:'Invalid email or password'});
		}
	}

	ajaxCall(){

		const token = $("#csrf_token").attr('content');

		const data = { 
						email : this.refs.email.value,
						pass : this.refs.pass.value,
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
     
		fetch('http://localhost/rlaravel/public/login', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					this.props.login();
					this.props.history.push('/');
			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})
	}

	render() {
		return(
				<div className="container row col-md-12">
					<center><h2>Login</h2></center>
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
								<center>Email :</center>
								</div>
								<div className="col-md-8">
								<input type="text" ref="email" name="email"/>
								</div>
								<div className="col-md-4">
								<center>Password :</center>
								</div>
								<div className="col-md-8">
								<input type="password" ref="pass" name="pass"/>
								</div>
								<div className="col-md-4">
								&nbsp;
								</div>
								<div className="col-md-8">
								<button className="btn btn-primary" onClick={this._handleLogin} type="button">Submit</button>
								</div>
							</div>
						</div>
					</div>
					</div>
					<div className="col-md-3">
					</div>
				</div>
			);
	}
} 
export default Login;