import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveVisits} from '../../ducks/reducer';

import VisitCard from './subcomponents/VisitCard';
import Loading from '../subcomponents/Loading';
import '../../App.css';

class Visits extends Component {
  componentDidMount() {
    this.props.retrieveVisits();
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
          <div style={styles}>{mappedVisits}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveVisits})(Visits);
