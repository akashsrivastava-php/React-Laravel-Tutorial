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
			msg: '',
			initialUsers: [],
		}

	this._handleLogout = this._handleLogout.bind(this);
	this._handleDelete = this._handleDelete.bind(this);
	this.filter = this.filter.bind(this);
	}


	filter(event){

		var initialData = this.state.initialUsers;

		var updatedList = initialData;
	    updatedList = updatedList.filter(function(item){
	      return item.name.toLowerCase().search(
	        event.target.value.toLowerCase()) !== -1;
	    });
	    this.setState({users: updatedList});

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
					this.setState({initialUsers:response.response});
					this.setState({msg:response.message});

			} else {
				this.setState({err:response.message});
			}
			return Promise.resolve();
		})


	}

	shouldComponentUpdate(nextState){

		return true;

	}

	_handleDelete(id, key){

		var userArray = this.state.users;

		console.log(userArray);

		userArray.splice(key, 1);

		this.setState({users:userArray});

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
					//window.location.reload();

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
				{this.state.msg}
				{this.state.err}

				<div className="col-md-12">
				<div className="col-md-3">
					</div>
				<div className="col-md-6"><input placeholder="Search by name" type="text" style={{width : '510px', align : 'center'}} onChange={this.filter}/></div>
					<div className="col-md-3">
					</div>
					</div>
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
									{this.state.users.map((elm, id)=>(
										<tr>
											<td>{id+1}</td>
											<td>{elm.name}</td>
											<td>{elm.email}</td>
											<td><button type="button" onClick={()=>{this.props.history.push('/edit/'+elm.id)}}>Edit</button>&nbsp;<button type="button" onClick={()=>{this._handleDelete(elm.id, id)}}>Delete</button></td>
										</tr>))}
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

export default View;