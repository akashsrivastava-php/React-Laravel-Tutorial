import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { parseJSON, httpUrl } from './../authentication/auth.js';

class Edit extends Component {
	constructor(props){
		super(props);

		this.state = {
			err : '',
			error: {},
			name: '',
			email: '',
			emailErr: '',
			nameErr: '',
			passErr: '',
		}

	this._handleLogout = this._handleLogout.bind(this);
	this._handleUpdate = this._handleUpdate.bind(this);
	this.inputVal = this.inputVal.bind(this);
	}

	_handleLogout(){
		this.props.logout();
		this.props.history.push('/');
	}

	_handleUpdate(){

		const token = $("#csrf_token").attr('content');

		const data = { 
						id : (this.props.location.pathname).match(/\d+/),
						name : this.refs.name.value,
						email : this.refs.email.value,
						pass : this.refs.pass.value
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
     
		fetch(httpUrl+'/update', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					//console.log(response.response);
					this.props.history.push('/home');

			} else {
				this.setState({emailErr:response.errors['email']});
				this.setState({nameErr:response.errors['name']});
			}
			return Promise.resolve();
		})

	}

	inputVal(event){

		this.setState({ [event.target.name] : [event.target.value] });

	}


	componentDidMount(){

		const token = $("#csrf_token").attr('content');

		const data = { 
						id : (this.props.location.pathname).match(/\d+/)
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
     
		fetch(httpUrl+'/edit', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					//console.log(response.response);
					this.setState({name:response.response[0].name});
					this.setState({email:response.response[0].email});

			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})
	
	}

	render() {

		return(
				<div className="container">
				<center><h2>Edit</h2></center>
				<button type="button" onClick={()=>{this.props.history.push('/home')}}>View</button>
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
								<input value={this.state.name} type="text" onKeyDown={(event) => {if(event.which == 13){this._handleRegister()}}} ref="name" name="name" onChange={this.inputVal}/>
								<p>{this.state.nameErr}</p>
								</div>
								<div className="col-md-4">
								<center>Email :</center>
								</div>
								<div className="col-md-8">
								<input value={this.state.email} type="text" onKeyDown={(event) => {if(event.which == 13){this._handleRegister()}}} ref="email" name="email" onChange={this.inputVal}/>
								<p>{this.state.emailErr}</p>
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
								<button className="btn btn-primary" onClick={this._handleUpdate} type="button">Update</button>
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
export default Edit;