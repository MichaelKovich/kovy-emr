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
  }

  medicationUpdate() {
    const {
      userid, dosage, prescribed, medication_name,
    } = this.state;

    axios
      .post('/providers/data/add-medication', {
        userid,
        dosage,
        prescribed,
        medication_name,
      })
      .then()
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
        <form onSubmit={this.medicationUpdate}>
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
              maxLength="60"
              required
              rows="1"
              onChange={event => this.setState({medication_name: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Dosage:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              maxLength="120"
              required
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
          <button type="submit" className="btn btn-secondary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients})(MedicationsAdd);
