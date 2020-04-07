import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';

import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>   {/* everything inside Provider will has access to redux store */}
    <BrowserRouter>   {/* everything inside BrowserRouter has ability to route between <Route> component as a SPA */}
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
