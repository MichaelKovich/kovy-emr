import React, {Component} from 'react';
import axios from 'axios';
import {authenticationInitial, physicianAuthentication} from '../ducks/reducer';
import {connect} from 'react-redux';

import Loading from './subcomponents/Loading';

class Processing extends Component {
  componentDidMount(req, res) {
    axios
      .get('/authentication/me')
      .then((response) => {
        this.props.authenticationInitial(response.data.user);
        this.props.physicianAuthentication(response.data.physician);
      })
      .then((response) => {
        if (this.props.physician) {
          this.props.history.push('/providers');
        } else {
          this.props.history.push('/patients');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return <Loading />;
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {authenticationInitial, physicianAuthentication})(Processing);
