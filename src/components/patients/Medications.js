import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMedications} from '../../ducks/reducer';

import MedicationCard from './subcomponents/MedicationCard';
import Loading from '../subcomponents/Loading';
import './styles/patients.css';

class Medications extends Component {
  componentDidMount() {
    this.props.retrieveMedications();
  }

  render() {
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
          <div className="medications-grid-wrapper">{mappedMedications}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMedications})(Medications);
