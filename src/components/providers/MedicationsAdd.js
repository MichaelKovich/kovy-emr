import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients} from '../../ducks/reducer';

import axios from 'axios';
import './styles/providers.css';

class MedicationsAdd extends Component {
  constructor() {
    super();

    this.state = {
      userid: 0,
      medication_name: '',
      dosage: '',
      prescribed: false,
    };

    this.medicationUpdate = this.medicationUpdate.bind(this);
  }

  componentWillMount() {
    this.props.retrievePatients();
    // Query the DB using "prov_get_patients.sql" to get a full list of patients.
    // Use this list of patients to populate the options in the form below.
    // For editing medications...
    // Query the DB using "prov_get_medications.sql" to get a full list of
    // patients joined to the medications table
    // This, use this list of patients to populate the options in the form below
    // onSelect, update fields with the values from the medication.
    // onSubmit, update fields as appropriate.
    // Control this using local state.
    // Move this to the reducer
    // Set the data to state
    // Map over the data:
    // data[i].family_name, given_name, userid
    // Set each element as an option below.
    // {mappedPatients} ^^
    // Include validation
    // value = {this.state.selectedMedication}
    // onSelect = update state
  }

  medicationUpdate() {
    const {
      userid, dosage, prescribed, medication_name,
    } = this.state;
    // axios call to update the database with information on state
    // /providers/data/add-medication
    axios
      .post('/providers/data/add-medication', {
        userid,
        dosage,
        prescribed,
        medication_name,
      })
      .then(console.log('Post Complete!'))
      .catch(err => console.log(err));
  }

  render() {
    const mappedPatients = this.props.patients.map(patient => (
      <option value={patient.userid}>
        {patient.userid} | {patient.given_name} {patient.family_name}
      </option>
    ));

    return (
      <div className="medications-c2">
        <form>
          <h2>Add Medication</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.setState({userid: event.target.value})}
            >
              {mappedPatients}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Medication Name:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              onChange={event => this.setState({medication_name: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Dosage:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              onChange={event => this.setState({dosage: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Prescription:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.setState({prescribed: event.target.value})}
            >
              <option value>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <button type="submit" className="btn btn-secondary" onClick={this.medicationUpdate}>
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients})(MedicationsAdd);
