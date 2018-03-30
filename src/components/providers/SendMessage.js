import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyPatients, retrieveMyColleagues} from '../../ducks/reducer';
import axios from 'axios';

import Loading from '../subcomponents/Loading';
import './styles/providers.css';

class SendMedications extends Component {
  constructor() {
    super();

    this.state = {
      recipientid: 0,
      subject: 0,
      content: 0,
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.retrieveMyPatients();
    this.props.retrieveMyColleagues();
  }

  sendMessage() {
    const {recipientid, subject, content} = this.state;
    const {userid} = this.props;

    // axios
    //   .post('', {
    //     recipientid,
    //     senderid: userid,
    //     subject,
    //     content,
    //   })
    //   .then()
    //   .catch(err => console.log(err));
  }

  render() {
    let mappedPatients = [];

    if (this.props.myPatients && this.props.myPatients.length > 0) {
      mappedPatients = this.props.myPatients.map(patient => (
        <option value={patient.userid}>
          {patient.userid} | {patient.given_name} {patient.family_name}
        </option>
      ));
    }

    let mappedProviders = [];

    if (this.props.myColleagues && this.props.myColleagues.length > 0) {
      mappedProviders = this.props.myColleagues.map(provider => (
        <option value={provider.userid}>
          {provider.userid} | {provider.given_name} {provider.family_name}
        </option>
      ));
    }

    return (
      <div className="medications-c2">
        <p>
          {this.props.myPatients && this.props.myPatients.length > 0 ? mappedPatients : <Loading />}
          <hr />
          {this.props.myColleagues && this.props.myColleagues.length > 0 ? (
            mappedProviders
          ) : (
            <Loading />
          )}
        </p>
        {/* <form onSubmit={this.medicationUpdate}>
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
        </form> */}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMyPatients, retrieveMyColleagues})(SendMedications);
