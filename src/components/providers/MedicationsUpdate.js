import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients, retrieveMedicationsMaster} from '../../ducks/reducer';

import axios from 'axios';
import './styles/providers.css';

class MedicationsUpdate extends Component {
  constructor() {
    super();

    this.state = {
      mappedMedications: [],
      medicationid: 0,
      medication_name: '',
      dosage: '',
      prescribed: false,
    };

    this.medicationFilter = this.medicationFilter.bind(this);
    this.initialMedicationState = this.initialMedicationState.bind(this);
    this.updateMedication = this.updateMedication.bind(this);
  }

  componentWillMount() {
    this.props.retrievePatients();
    this.props.retrieveMedicationsMaster();
  }

  medicationFilter(patientID) {
    const {medicationsMaster} = this.props;

    const mappedMedications = medicationsMaster
      .filter(medication => +medication.patientid === +patientID)
      .map(medication => (
        <option value={medication.medicationid}>{medication.medication_name}</option>
      ));

    this.setState({
      medicationid: '',
      medication_name: '',
      dosage: '',
    });
    this.setState({mappedMedications});
    return mappedMedications;
  }

  initialMedicationState(id) {
    if (id === 'holder') {
      return this.setState({
        medicationid: 0,
        medication_name: '',
        dosage: '',
        prescribed: false,
      });
    }

    const selectedMedication = this.props.medicationsMaster.filter(medication => +medication.medicationid === +id);

    const {
      medicationid, medication_name, dosage, prescribed,
    } = selectedMedication[0];

    this.setState({
      medicationid,
      medication_name,
      dosage,
      prescribed,
    });
  }

  updateMedication() {
    // Method for updating the medication in the DB after the form is submitted.
    const {
      medicationid, medication_name, dosage, prescribed,
    } = this.state;

    axios
      .put('/providers/data/update-medication', {
        dosage,
        prescribed,
        medication_name,
        medicationid,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    // Mapping over all the patients in the database for use as options in the form below.
    const mappedPatients = this.props.patients.map(patient => (
      <option value={patient.userid}>
        {patient.userid} | {patient.given_name} {patient.family_name}
      </option>
    ));

    return (
      <div className="medications-c2">
        <form onSubmit={this.updateMedication}>
          <h2>Update Medication</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.medicationFilter(event.target.value)}
            >
              <option selected>Please select a patient.</option>
              {mappedPatients}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Medication:</label>
            <select
              value={this.state.medicationid}
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.initialMedicationState(event.target.value)}
            >
              <option value="holder">Please select a medication.</option>
              {this.state.mappedMedications}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Medication Name:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.medication_name}
              maxLength="60"
              required
              onChange={event => this.setState({medication_name: event.target.value})}
              rows="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Dosage:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.dosage}
              maxLength="120"
              required
              onChange={event => this.setState({dosage: event.target.value})}
              rows="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Prescription:</label>
            <select
              value={this.state.prescribed}
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.setState({prescribed: event.target.value})}
            >
              <option value>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <button type="submit" className="btn btn-secondary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {
  retrievePatients,
  retrieveMedicationsMaster,
})(MedicationsUpdate);
