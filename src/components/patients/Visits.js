import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveVisits} from '../../ducks/reducer';

import VisitCard from './subcomponents/VisitCard';
import Loading from '../subcomponents/Loading';
import './styles/patients.css';

class Visits extends Component {
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
        {this.props.visits && this.props.visits.length > 0 ? (
          <div className="visits-grid-wrapper">{mappedVisits}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveVisits})(Visits);
