import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from './subcomponents/Header';
import Footer from './subcomponents/Footer';
import Loading from '../subcomponents/Loading';
import './styles/patients.css';

class Patients extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {/* {this.props.isLoading ? <Loading /> : <div>Hello, {this.props.username}!</div>} */}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default connect(state => state)(Patients);
