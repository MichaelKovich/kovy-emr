// Dashboard.js will be for patients to access their own information.
// Providers.js will be a dashboard for physicians to view and add information to a patient's record.

// PROVIDERS:
// Login Page
// Processing Page
// Homepage View
// Select a patient
// Patient Dashboard
// Add Visit
// Add Medication
// Update Medication
// Send Messages

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {userAuthenticate} from '../../ducks/reducer';
import axios from 'axios';

import Header from './subcomponents/Header';
import Footer from './subcomponents/Footer';
import Button from '../subcomponents/Button';
import Loading from '../subcomponents/Loading';
import '../../App.css';

class Providers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.isLoading ? <Loading /> : <div>Hello, {this.props.username}!</div>}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Providers);
