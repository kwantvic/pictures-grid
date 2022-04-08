import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import './scss/app.scss';
import {App} from './App';
import store from './redux';

ReactDOM.render(
    <BrowserRouter><React.StrictMode>
        <Provider store={store}><App/></Provider>
    </React.StrictMode></BrowserRouter>,
  document.getElementById('root')
);
