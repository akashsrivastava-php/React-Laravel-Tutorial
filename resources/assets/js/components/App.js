import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Routing } from './Routing.js';

export default class App extends Component {
    render() {
        return (
            <div>
             { Routing() }
            </div> 
        );  
    }
}