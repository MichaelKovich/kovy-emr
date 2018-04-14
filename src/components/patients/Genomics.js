import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkToken} from '../../ducks/reducer';
import axios from 'axios';
import {withRouter} from 'react-router';

import GenomicsReports from './GenomicsReports';
import GenomicsAuthorization from './GenomicsAuthorization';
import Loading from '../subcomponents/Loading';
import '../../App.css';

class Genomics extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(req, res) {
    axios
      .get('/data/token')
      .then((response) => {
        console.log('Axios Response: ', response);
        this.props.checkToken(response.data.token);
      })
      .then((response) => {
        if (this.props.genomicsToken) {
          this.props.history.push('/patients/genomics/reports');
        } else {
          this.props.history.push('/patients/genomics/authorization');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return <Loading />;
  }
}

export default withRouter(connect(state => state, {checkToken})(Genomics));
