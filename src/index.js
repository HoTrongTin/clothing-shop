import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'

//dùng để kết nối với persist storage (localStorage)
import { PersistGate } from 'redux-persist/integration/react'

import './index.css';
import App from './App';

import { store, persistor } from './redux/store';


ReactDOM.render(
  <Provider store={store}>   {/* everything inside Provider will has access to redux store */}
    <BrowserRouter>   {/* everything inside BrowserRouter has ability to route between <Route> component as a SPA */}
      <PersistGate persistor={persistor}>     {/* <App> now have access to persist storage */}
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
