import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {retrieveMedications} from '../../ducks/reducer';

import MedicationCard from './subcomponents/MedicationCard';
import './styles/patients.css';
import '../../App.css';

class Medications extends Component {
  constructor() {
    super();
  }

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
        <div className="medications-grid-wrapper">
          {this.props.medications && this.props.medications.length > 0
            ? mappedMedications
            : 'Please wait.'}
        </div>
      </div>
    );
  }
}

export default connect(state => state, {retrieveMedications})(Medications);
