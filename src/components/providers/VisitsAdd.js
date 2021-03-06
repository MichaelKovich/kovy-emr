import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrievePatients, retrieveProviders} from '../../ducks/reducer';

import Loading from '../subcomponents/Loading';
import axios from 'axios';
import '../../App.css';

class VisitsAdd extends Component {
  constructor() {
    super();

    this.state = {
      type: '',
      date: '',
      patient: 0,
      provider: 0,
    };

    this.visitsUpdate = this.visitsUpdate.bind(this);
  }

  componentDidMount() {
    this.props.retrievePatients();
    this.props.retrieveProviders();
  }

  visitsUpdate() {
    const {
      type, date, patient, provider,
    } = this.state;

    axios
      .post('/providers/data/add-visit', {
        type,
        date,
        patient,
        provider,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'center',
      fontFamily: 'Raleway',
    };

    let mappedPatients = [];

    if (this.props.patients && this.props.patients.length > 0) {
      mappedPatients = this.props.patients.map(patient => (
        <option value={patient.userid}>
          {patient.userid} | {patient.given_name} {patient.family_name}
        </option>
      ));
    }

    let mappedProviders = [];

    if (this.props.providers && this.props.providers.length > 0) {
      mappedProviders = this.props.providers.map(provider => (
        <option value={provider.userid}>
          {provider.userid} | {provider.given_name} {provider.family_name}
        </option>
      ));
    }

    return (
      <div style={styles}>
        {this.props.patients && this.props.patients.length > 0 ? (
          <form onSubmit={this.visitsUpdate}>
            <h2>Add Visit</h2>
            <hr />
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Patient:</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                required
                onChange={event => this.setState({patient: event.target.value})}
              >
                <option selected disabled>
                  Please select a patient.
                </option>
                {mappedPatients}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Provider:</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                required
                onChange={event => this.setState({provider: event.target.value})}
              >
                <option selected disabled>
                  Please select a provider.
                </option>
                {mappedProviders}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Type of Visit:</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                required
                maxLength="80"
                rows="1"
                onChange={event => this.setState({type: event.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Date of Visit:</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                required
                maxLength="40"
                rows="1"
                placeholder="mm-dd-yyyy"
                onChange={event => this.setState({date: event.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Add
            </button>
          </form>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrievePatients, retrieveProviders})(VisitsAdd);
