import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients, retrieveMedicationsMaster} from '../../ducks/reducer';

import axios from 'axios';
import './styles/providers.css';

class MedicationsUpdate extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.retrievePatients();
    this.props.retrieveMedicationsMaster();
  }

  render() {
    return (
      <div className="medications-c2">
        <form>
          <h2>Add Medication</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select className="form-control" id="exampleFormControlSelect1">
              {/* {mappedPatients} */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Medication:</label>
            <select className="form-control" id="exampleFormControlSelect1">
              {/* {mappedMedications} */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Medication Name:</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Dosage:</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Prescription:</label>
            <select className="form-control" id="exampleFormControlSelect1">
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
