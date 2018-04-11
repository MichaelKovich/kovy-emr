import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients} from '../../ducks/reducer';

import axios from 'axios';
import './styles/providers.css';

class BillingAdd extends Component {
  constructor() {
    super();

    this.state = {
      patientid: 0,
      amount: 0,
      description: '',
    };

    this.billingAdd = this.billingAdd.bind(this);
  }

  componentDidMount() {
    this.props.retrievePatients();
  }

  billingAdd() {
    const {patientid, amount, description} = this.state;

    axios
      .post('/providers/data/add-bill', {
        patientid,
        amount,
        description,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    let mappedPatients = [];

    if (this.props.patients && this.props.patients.length > 0) {
      mappedPatients = this.props.patients.map(patient => (
        <option value={patient.userid}>
          {patient.userid} | {patient.given_name} {patient.family_name}
        </option>
      ));
    }

    return (
      <div className="medications-c2">
        <form onSubmit={this.billingAdd}>
          <h2>Add Bill</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={event => this.setState({patientid: event.target.value})}
            >
              <option selected disabled>
                Please select a patient.
              </option>
              {this.props.patients && this.props.patients.length > 0 ? mappedPatients : null}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Bill Description:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              maxLength="60"
              required
              rows="1"
              onChange={event => this.setState({description: event.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Amount:</label>
            <input
              className="form-control"
              id="exampleFormControlTextarea1"
              maxLength="9"
              type="number"
              placeholder="Enter the amount in the form xx.xx"
              min="0"
              step="0.01"
              required
              rows="1"
              onChange={event =>
                this.setState({amount: Number(event.target.value.replace(/[$,.]/g, ''))})
              }
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients})(BillingAdd);
