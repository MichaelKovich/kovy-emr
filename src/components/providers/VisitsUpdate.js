import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients, retrieveProviders, retrieveVisitsMaster} from '../../ducks/reducer';

import axios from 'axios';
import './styles/providers.css';

class VisitsUpdate extends Component {
  constructor() {
    super();

    this.state = {
      type: '',
      date: '',
      patient: 0,
      provider: 0,
      visitid: 0,
      mappedVisits: [],
    };

    this.visitFilter = this.visitFilter.bind(this);
    this.initialVisitState = this.initialVisitState.bind(this);
    this.updateVisits = this.updateVisits.bind(this);
  }

  componentWillMount() {
    this.props.retrievePatients();
    this.props.retrieveProviders();
    this.props.retrieveVisitsMaster();
  }

  visitFilter(patientID) {
    const {visitsMaster} = this.props;

    const mappedVisits = visitsMaster
      .filter(visit => +visit.patient === +patientID)
      .map(visit => <option value={visit.visitid}>{visit.date}</option>);

    this.setState({
      type: '',
      date: '',
      patient: 0,
      provider: 0,
      visitid: 0,
    });
    this.setState({mappedVisits});
    return mappedVisits;
  }

  initialVisitState(id) {
    const selectedVisit = this.props.visitsMaster.filter(visit => +visit.visitid === +id);

    const {
      type, date, patient, provider, visitid,
    } = selectedVisit[0];

    this.setState({
      type,
      date,
      patient,
      provider,
      visitid,
    });
  }

  updateVisits() {
    console.log(this.state);
    // Method for updating the medication in the DB after the form is submitted.
    const {
      type, date, patient, provider, visitid,
    } = this.state;

    axios
      .put('/providers/data/update-visit', {
        type,
        date,
        patient,
        provider,
        visitid,
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

    // Mapping over all the providers in the database for use as options in the form below.
    const mappedProviders = this.props.providers.map(provider => (
      <option value={provider.userid}>
        {provider.userid} | {provider.given_name} {provider.family_name}
      </option>
    ));

    return (
      <div className="medications-c2">
        <form onSubmit={this.updateVisits}>
          <h2>Update Visit</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Patient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={event => this.visitFilter(event.target.value)}
            >
              <option selected disabled>
                Please select a patient.
              </option>
              {mappedPatients}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Visit:</label>
            <select
              value={this.state.visitid}
              className="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={event => this.initialVisitState(event.target.value)}
            >
              <option value={0} disabled>
                Please select a visit.
              </option>
              {this.state.mappedVisits}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Provider:</label>
            <select
              value={this.state.provider}
              className="form-control"
              id="exampleFormControlSelect1"
              required
              onChange={event => this.setState({provider: event.target.value})}
            >
              <option value={0} disabled>
                Please select a provider for this visit.
              </option>
              {mappedProviders}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Type of Visit:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.type}
              required
              maxLength="80"
              onChange={event => this.setState({type: event.target.value})}
              rows="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Date of Visit:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={this.state.date}
              required
              maxLength="40"
              onChange={event => this.setState({date: event.target.value})}
              rows="1"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients, retrieveProviders, retrieveVisitsMaster})(VisitsUpdate);
