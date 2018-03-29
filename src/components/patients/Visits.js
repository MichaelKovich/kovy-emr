import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {retrieveVisits} from '../../ducks/reducer';

import VisitCard from './subcomponents/VisitCard';
import './styles/patients.css';
import '../../App.css';

class Visits extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.retrieveVisits();
  }

  render() {
    return (
      <div>
        <div className="visits-grid-wrapper">{mappedVisits}</div>
      </div>
    );
  }
}

export default connect(state => state, {retrieveVisits})(Visits);
