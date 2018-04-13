import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMedications} from '../../ducks/reducer';

import MedicationCard from './subcomponents/MedicationCard';
import Loading from '../subcomponents/Loading';
import '../../App.css';

class Medications extends Component {
  componentDidMount() {
    this.props.retrieveMedications();
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

    let mappedMedications = [];

    if (this.props.medications && this.props.medications.length > 0) {
      mappedMedications = this.props.medications.map(medication => (
        <MedicationCard
          medicationname={medication.medication_name}
          dosage={medication.dosage}
          prescribed={medication.prescribed ? 'Prescription' : 'Over-the-Counter'}
        />
      ));
    }

    return (
      <div>
        {this.props.medications && this.props.medications.length > 0 ? (
          <div style={styles}>{mappedMedications}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMedications})(Medications);
