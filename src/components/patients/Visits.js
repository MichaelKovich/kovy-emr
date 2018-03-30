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

  componentDidMount() {
    this.props.retrieveVisits();
  }

  render() {
    let mappedVisits = [];

    if (this.props.visits && this.props.visits.length > 0) {
      mappedVisits = this.props.visits.map(visit => (
        <VisitCard
          date={visit.date}
          type={visit.type}
          familyname={visit.family_name}
          givenname={visit.given_name}
        />
      ));
    }

    return (
      <div>
        <div className="visits-grid-wrapper">
          {this.props.visits && this.props.visits.length > 0 ? mappedVisits : 'Please wait.'}
        </div>
      </div>
    );
  }
}

export default connect(state => state, {retrieveVisits})(Visits);