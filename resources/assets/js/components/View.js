import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { parseJSON, httpUrl } from './../authentication/auth.js';

class View extends Component {
	constructor(props){
		super(props);

		this.state = {
			err : '',
			error: {},
			users: [],
		}

	this._handleLogout = this._handleLogout.bind(this);
	this._handleDelete = this._handleDelete.bind(this);
	}

	componentWillMount(){


		const token = $("#csrf_token").attr('content');

		const options = {
                method: 'GET',
                //mode: "cors",
                credentials: "same-origin",
                headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'X-CSRF-TOKEN': token
          },
        }
     
		fetch(httpUrl+'/view', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					this.setState({users:response.response});

			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})


	}

	_handleDelete(id){

		const token = $("#csrf_token").attr('content');

		const data = { 
						id : id
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
     
		fetch(httpUrl+'/delete', options)
		.then(parseJSON)
		.then((response)=>{
			if(response.status !== undefined && response.status == "success") {
					//console.log(response.response);
					//this.props.history.push('/home');
					window.location.reload();

			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})
	
	}



	_handleLogout(){
		this.props.logout();
		this.props.history.push('/');
	}


	render() {
		return(
				<div className="container">
				<center><h2>View</h2></center>
				<button type="button" onClick={()=>{this.props.history.push('/add')}}>Add</button>
				<button type="button" onClick={this._handleLogout}>Logout</button>
				<br/>

				<div className="container row col-md-12">
					<div className="col-md-3">
					</div>
					<div className="col-md-6">
					<div className="panel panel-default">
						<div className="panel-body">
							<table className="table">
								<thead>
									<tr>
										<th>Sr. No.</th>
										<th>Name</th>
										<th>Email</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{this.state.users.map((elm, id)=><Users key={id} id={id} props={this.props} user={elm}/>)}
								</tbody>
							</table>
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

class Users extends View{

render(){

return(

	<tr>
		<td>{this.props.id+1}</td>
		<td>{this.props.user.name}</td>
		<td>{this.props.user.email}</td>
		<td><button type="button" onClick={()=>{this.props.props.history.push('/edit/'+this.props.user.id)}}>Edit</button>&nbsp;<button type="button" onClick={()=>{this._handleDelete(this.props.user.id)}}>Delete</button></td>
	</tr>

	);

}

}
export default View;