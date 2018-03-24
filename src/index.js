import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

const application = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

ReactDOM.render(application, document.getElementById('root'));
