import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
