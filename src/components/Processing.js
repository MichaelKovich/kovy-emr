import React, {Component} from 'react';
import axios from 'axios';
import {authenticationInitial} from '../ducks/reducer';
import {connect} from 'react-redux';

import Loading from '../subcomponents/Loading';
import '../App.css';

class Processing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(req, res) {
    axios
      .get('/authentication/me')
      .then((response) => {
        this.props.authenticationInitial(response.data);
      })
      .then((response) => {
        this.props.history.replace('/dashboard');
      })
      .catch(err => console.log(err));
  }

  render() {
    return <Loading />;
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {authenticationInitial})(Processing);
