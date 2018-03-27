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

class Patients extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.isLoading ? <Loading /> : <div>Hello, {this.props.username}!</div>}
        <Footer />
      </div>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Patients);
