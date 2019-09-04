import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// defualts for the entire app
// also see use of instance in axios.js
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// with line above commented, need to use axios.js in all scripts to get baseURL
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['dummy-test'] = 'abcd';


// used to set action to take globally for axios request
// like adding headers to the request or logging
const requestInterceptor =axios.interceptors.request.use(request => {
    console.log('interceptor request: ',request);
    return request;
}, error => {
    console.log('interceptor response error: ', error);
    return Promise.reject(error);
});

const responseInterceptor = axios.interceptors.response.use(response => {
    // console.log('interceptor response: ',response);
    return response;
}, error => {
    console.log('interceptor response error: ', error);
    return Promise.reject(error);
});

// to disable an inteceptor
    // axios.interceptors.response.eject(responseInterceptor);
    // axios.interceptors.request.eject(requestInterceptor);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
