import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {userAuthenticate} from '../ducks/reducer';
import axios from 'axios';

import Button from '../subcomponents/Button';
import Loading from '../subcomponents/Loading';
import '../App.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(req, res, next) {
    this.props.userAuthenticate();
  }

  render() {
    return (
      <div>{this.props.isLoading ? <Loading /> : <div>Hello, {this.props.username}!</div>}</div>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Dashboard);
