import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Route from './router';

ReactDOM.render(
  <React.StrictMode>
    <>
      <ToastContainer autoClose={5000} />
      <Route />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
