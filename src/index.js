import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/app.css';
import './css/header.css';
import App from './components/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
