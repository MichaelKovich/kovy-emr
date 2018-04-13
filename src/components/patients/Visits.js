import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveVisits} from '../../ducks/reducer';
import axios from 'axios';
import moment from 'moment';

import VisitCard from './subcomponents/VisitCard';
import Loading from '../subcomponents/Loading';
import '../../App.css';

class Visits extends Component {
  constructor() {
    super();

    this.cancelVisit = this.cancelVisit.bind(this);
  }

  componentDidMount() {
    this.props.retrieveVisits();
  }

  cancelVisit(visitid, date) {
    // Checks whether the date is in the future.
    if (moment(date).isAfter(moment())) {
      axios
        .put(`/patients/data/cancel-visit/${visitid}`, {date})
        .then(res => this.props.retrieveVisits())
        .catch(err => console.log(err));
    } else {
      const today = moment();
      // Checks whether the visit is scheduled for today.
      moment(date).isSame(today, 'day')
        ? alert('This visit is within the next 24 hours. Please call our office to cancel.')
        : alert('This visit was in the past!');
    }
  }

  render() {
    const styles = {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '1%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '10px',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedVisits = [];

    if (this.props.visits && this.props.visits.length > 0) {
      mappedVisits = this.props.visits.map(visit => (
        <VisitCard
          visitid={visit.visitid}
          date={visit.date}
          type={visit.type}
          familyname={visit.family_name}
          givenname={visit.given_name}
          onCancel={this.cancelVisit}
        />
      ));
    }

    return (
      <div>
        {this.props.visits && this.props.visits.length > 0 ? (
          <div style={styles}>{mappedVisits}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveVisits})(Visits);
