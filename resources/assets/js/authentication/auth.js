import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export function checkAlreadyLogin(comp1, comp2){
	var token = sessionStorage.getItem('token');
	if(token!=null && token.length>0){
		return comp1;
	}else{
		return comp2;
	}
}

export function login(){
	sessionStorage.setItem('token', '1234567890');
	//window.location.reload();
}

export function logout(){
	sessionStorage.removeItem('token');
	//window.location.reload();
}

export function parseJSON(response) {
    return response.json();
}